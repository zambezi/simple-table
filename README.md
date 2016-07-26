# Simple Table

D3 components to build simple HTML tables from your data.

## The simplest case

If you have an array of objects, `dataElements`,
and a target DOM node that supports `<tr>`s and `<td>`s,

    <table class='target'></table>

    var table = createTable()
    d3.select('table.target').datum(dataElements).call(table)

The component will create one row for each of the elements, and one cell for each of its attributes.
By default it'll try to represent each of those attributes as a string.

## Further configuration

You can configure which columns you want to be displayed.

* The `key` property is used to extract the attribute for the column.
* The `format` function will be called once with each row object, or with the row attribute if `key` was also defined.
* The `className` property, if defined, will set the `className` on the cells it owns. This can also be set to a function for dynamic styling. The function will be invoked with a single argument of the cell's value.


    var table = createTable().columns(
          [
            { key: 'name' }
          , { key: 'email', className: 'text-light-secondary' }
          , { format: (d) => d.address.city }
          , { key: 'price', format: d3.format('.3f') }
          ]
        )

    d3.select('table.target').datum(
      [
        {
          name: 'Álvaro'
        , email: 'alvaro@rbs.com'
        , address: { city: 'London' }
        , price: 234234,23433223
        }
      , {
          name: 'Ignacio'
        , email: 'ignacio@rbs.com'
        , address: { city: 'London' }
        , price: 111111,234234234
        }
      ]
    ).call(table)

### Table headers

You can show table headers like this:

- enable headers
- put a `label` property for each column definition

```
table = createTable()
    .displayHeaders(true)
    .columns(
      [
        { key: 'name', label: 'Name' }
      , { key: 'email', label: 'Email', className: 'text-light-secondary' }
      , { format: (d) => d.address.city, label: 'City' }
      , { key: 'price', label: 'Price', format: d3.format('.3f') }
      ]
    )
```

## Selection

The simple-table component has the concept of selected rows.
You can define which rows are selected by using its `selected` getter/setter.
This property takes an array of objects subset of the data bound on the DOM node.
For each of the rows which are also in the `selected` collection, the table will add the `is-selected` class.
It's up to you to define the style for your particular case.

## Events

When you click on a table row, the component will dispatch a `select` event.
You can use that to manipulate the `selected` collection and redraw the table.

The logic of how this event should be interpreted is up to the client.

    var target = d3.select('table.target').datum(data)
      , table = createTable().on('select', addToSelection)

    draw()

    function draw() {
      target.call(table)
    }

    function addToSelection(row) {
      table.selected([ row ]) // Basic single selection
                              // You can potentially append to this list instead
                              // to achieve multiple selection.
      draw()
    }


## Style

The `body` component does _not_ provide styles.
You should, if necessary, define yours.
