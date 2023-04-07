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
  html-cell: "<td>{{ firstname }} {{ lastname }}</td>"
```

### `object-field-names` [REQUIRED]

This is json, and contains a list of the names of the fields in your json file data object

```yaml
with:
  object-field-names: "[ "firstname", "lastname" ]"
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
  json-file-path: "your-filename.json"
```

### `file-to-use` [OPTIONAL]

**Defaults to `README.md`**

```yaml
with:
  file-to-use: "README.md"
```

## Example usage

Add `<!--START_SECTION:data-section-->` and `<!--END_SECTION:data-section-->` where you would like your table to appear in your README.

```yaml
jobs:
  table:
    runs-on: ubuntu-latest
    name: Update README from json data
    steps:
      - uses: actions/checkout@v3
      - name: Read/Write data into README
        uses: EddieHubCommunity/gh-actions-html-table-generator@main
        with:
          json-file-path: "data.json"
          github-token: ${{ secrets.GITHUB_TOKEN }}
          columns: 3
          object-field-names: "[ "githubUsername", "name", "imageUrl", "issueNumber" ]"
          file-to-use: "README.md"
          html-cell: "<td align="center"><p><a href="https://github.com/{{ githubUsername }}">{{ name }}</a></p><img src="{{ imageUrl }}" /><p><a href="https://github.com/EddieHubCommunity/awesome-github-profiles/issues/{{ issueNumber }}">(💯 give your vote)</a></p></td>"
```

### Json file

```typescript
[
  {
    name: "Akas Rai",
    githubUsername: "akasrai",
    imageUrl:
      "https://user-images.githubusercontent.com/624760/88123456-d40df580-cbc2-11ea-9add-a7fc8675b243.png",
    issueNumber: 12,
  },
];
```

From this repository usage: [Awesome GitHub profiles](https://github.com/EddieHubCommunity/awesome-github-profiles).
