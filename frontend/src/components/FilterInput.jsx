const FilterInput = ({setFilter, filter}) => (
  <div>
  <h2>Filter by name:</h2>
  <input onChange={(e) => setFilter(e.target.value)} value={filter} />
</div>
);

export default FilterInput;