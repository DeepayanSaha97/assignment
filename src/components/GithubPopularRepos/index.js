import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
    repositoryItemsList: [],
  }

  componentDidMount() {
    this.makeRequestById()
  }

  updateActiveLanguageId = id => {
    this.setState({activeLanguageId: id})
  }

  makeRequestById = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeLanguageId} = this.state
    const url = ` https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`

    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        repositoryItemsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {repositoryItemsList} = this.state
    return (
      <ul className="repository-items-list">
        {repositoryItemsList.map(eachRepository => (
          <RepositoryItem
            key={eachRepository.id}
            itemDetails={eachRepository}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
    </div>
  )

  renderApiResponseView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="bg-con">
        <h1 className="main-heading">Popular</h1>
        <ul className="languages-selection-list">
          {languageFiltersData.map(language => (
            <LanguageFilterItem
              activeLanguageId={activeLanguageId}
              key={language.id}
              languageFiltersDetails={language}
              updateActiveLanguageId={this.updateActiveLanguageId}
              isActive={language.id === activeLanguageId}
            />
          ))}
        </ul>
        {this.renderApiResponseView()}
      </div>
    )
  }
}

export default GithubPopularRepos
