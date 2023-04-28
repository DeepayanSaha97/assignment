import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {name, forksCount, issuesCount, starsCount, avatarUrl} = itemDetails

  return (
    <li className="repository-item-card">
      <img src={avatarUrl} className="repository-img" alt={name} />
      <h1 className="repository-name">{name}</h1>
      <div className="count-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="count-icon"
        />
        <p className="total-count-text">{starsCount} stars</p>
      </div>
      <div className="count-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="count-icon"
        />
        <p className="total-count-text">{forksCount} forks</p>
      </div>
      <div className="count-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="count-icon"
        />
        <p className="total-count-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
