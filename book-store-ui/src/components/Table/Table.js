import "./Table.css";

const Table = (books) => {
  return (
    <div className="Table">
      <table>
        <tr>
          <th colSpan="2">Best Selling Books</th>
        </tr>
        {books.books?.length === 0 ? (
          <tr key="0">
            <td>No data available</td>
            <td></td>
          </tr>
        ) : (
          books.books.map((book, key) => {
            const b = JSON.parse(book);
            return (
              <tr key={key}>
                <td>{b.name}</td>
                <td>{b.authorName}</td>
              </tr>
            );
          })
        )}
      </table>
    </div>
  );
};

export default Table;
