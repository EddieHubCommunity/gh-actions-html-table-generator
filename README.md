# Table generator

This GitHub Action creates a html table in your `README.md` from a json file.

![Screenshot](https://user-images.githubusercontent.com/624760/91109172-0f905980-e672-11ea-8126-16276c821914.png)

## Inputs

### `github-token` [REQUIRED]

This is available in your GitHub Action

```yaml
with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

### `html-cell` [REQUIRED]

This is the html table cell content with `object-field-names`

```yaml
with:
    html-cell: '<td>{{ firstname }} {{ lastname }}</td>'
```

### `object-field-names` [REQUIRED]

This is json, and contains a list of the names of the fields in your json file data object

```yaml
with:
    object-field-names: '[ "firstname", "lastname" ]'
```

### `columns` [OPTIONAL]

**defaults to `2`**

```yaml
with:
    columns: 3
```

### `json-file-path` [OPTIONAL]

**defaults to `data.json`**

```yaml
with:
    json-file-path: 'your-filename.json'
```

### `file-to-use` [OPTIONAL]

**Defaults to `README.md`**

```yaml
with:
    file-to-use: 'README.md'
```

### `section-name` [OPTIONAL]

This allows you to change the `data-section` name in the comments to something else.
This also allows multiple runs on the same file, for different sections.

**defaults to `data-section`**

```yaml
with:
    section-name: my-custom-section
```

## Example usage

Add `<!--START_SECTION:data-section-->` and `<!--END_SECTION:data-section-->` where you would like your table to appear in your README.

```yaml
jobs:
  table:
    runs-on: ubuntu-latest
    name: Update README from json data
    steps:
    - uses: actions/checkout@v2
    - name: Read/Write data into README
      uses: eddiejaoude/github-actions-reader-writer@v0.1
      with:
        json-file-path: 'data.json'
        github-token: ${{ secrets.GITHUB_TOKEN }}
        columns: 3
        object-field-names: '[ "githubUsername", "name", "imageUrl", "issueNumber" ]'
        file-to-use: 'README.md'
        html-cell: '<td align="center"><p><a href="https://github.com/{{ githubUsername }}">{{ name }}</a></p><img src="{{ imageUrl }}" /><p><a href="https://github.com/EddieJaoudeCommunity/awesome-github-profiles/issues/{{ issueNumber }}">(:100: give your vote)</a></p></td>'
```

### Json file

```typescript
[
    {
        "name": "Akas Rai",
        "githubUsername": "akasrai",
        "imageUrl": "https://user-images.githubusercontent.com/624760/88123456-d40df580-cbc2-11ea-9add-a7fc8675b243.png",
        "issueNumber": 12
    }
]
```

From this repository usage <https://github.com/EddieJaoudeCommunity/awesome-github-profiles>

## Our Pledge

We take participation in our community as a harassment-free experience for everyone and we pledge to act in ways to contribute to an open, welcoming, diverse and inclusive community.  

If you have experienced or been made aware of unacceptable behaviour, please remember that you can report this.  Read our [Code of Conduct](https://github.com/EddieHubCommunity/gh-actions-html-table-generator/blob/main/CODE_OF_CONDUCT.md).
