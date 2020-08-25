# Table generator

This GitHub Action creates a table in your `README.md`

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

## Example usage

```yaml
jobs:
  table:
    runs-on: ubuntu-latest
    name: Update README from json data
    steps:
    - uses: actions/checkout@v2
    - name: Read/Write data into README
      uses: eddiejaoude/github-actions-reader-writer@master
      with:
        json-file-path: 'data.json'
        github-token: ${{ secrets.GITHUB_TOKEN }}
        columns: 3
```
