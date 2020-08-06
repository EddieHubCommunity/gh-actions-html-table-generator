import { request } from '@octokit/request'

export interface ReadmeBoxOpts {
  owner: string
  repo: string
  token: string
  branch?: string
}

export interface UpdateSectionOpts extends ReadmeBoxOpts {
  section: string
  message?: string
}

export interface ReplaceSectionOpts {
  section: string
  newContents: string
  oldContents: string
}

export class ReadmeBox {
  public owner: string
  public repo: string
  public token: string
  public branch: string
  private request: typeof request

  constructor(opts: ReadmeBoxOpts) {
    this.owner = opts.owner
    this.repo = opts.repo
    this.token = opts.token
    this.branch = opts.branch || 'master'

    this.request = request.defaults({
      headers: {
        authorization: `token ${this.token}`
      }
    })
  }

  static async updateSection(newContents: string, opts: UpdateSectionOpts) {
    const box = new ReadmeBox(opts)

    // Get the README
    const { content, sha, path } = await box.getReadme()

    // Replace the old contents with the new
    const replaced = box.replaceSection({
      section: opts.section,
      oldContents: content,
      newContents
    })

    // Actually update the README
    return box.updateReadme({
      content: replaced,
      message: opts.message,
      branch: opts.branch,
      sha,
      path
    })
  }

  async getReadme() {
    const { data } = await this.request('GET /repos/:owner/:repo/readme', {
      owner: this.owner,
      repo: this.repo,
      ref: this.branch
    })

    // The API returns the blob as base64 encoded, we need to decode it
    const encoded = data.content
    const decoded = Buffer.from(encoded, 'base64').toString('utf8')

    return {
      content: decoded,
      sha: data.sha,
      path: data.path
    }
  }

  async updateReadme(opts: {
    content: string
    sha: string
    path?: string
    message?: string
    branch?: string
  }) {
    return this.request('PUT /repos/:owner/:repo/contents/:path', {
      owner: this.owner,
      repo: this.repo,
      content: Buffer.from(opts.content).toString('base64'),
      path: opts.path || 'README.md',
      message: opts.message || 'Updating the README!',
      sha: opts.sha,
      branch: opts.branch || 'master'
    })
  }

  getSection(section: string, content: string) {
    const { regex } = this.createRegExp(section)
    const match = content.match(regex)
    return match?.groups?.content
  }

  replaceSection(opts: ReplaceSectionOpts) {
    const { regex, start, end } = this.createRegExp(opts.section)

    if (!regex.test(opts.oldContents)) {
      throw new Error(
        `Contents do not contain start/end comments for section "${opts.section}"`
      )
    }

    const newContentsWithComments = `${start}\n${opts.newContents}\n${end}`
    return opts.oldContents.replace(regex, newContentsWithComments)
  }

  private createRegExp(section: string) {
    const start = `<!--START_SECTION:${section}-->`
    const end = `<!--END_SECTION:${section}-->`
    const regex = new RegExp(`${start}\n(?:(?<content>[\\s\\S]+)\n)?${end}`)
    return { regex, start, end }
  }
}
