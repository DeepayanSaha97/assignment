import './index.css'

const LanguageFilterItem = props => {
  const {
    updateActiveLanguageId,
    languageFiltersDetails,
    activeLanguageId,
    isActive,
  } = props
  const {id, language} = languageFiltersDetails

  const className = isActive
    ? 'highlighted-language-item language-item'
    : 'language-item'

  const onSelectLanguage = () => {
    updateActiveLanguageId(id)
  }

  return (
    <li className={className}>
      <button
        type="button"
        className="language-item-btn"
        onClick={onSelectLanguage}
      >
        <h1 className="language-name">{language}</h1>
      </button>
    </li>
  )
}

export default LanguageFilterItem
