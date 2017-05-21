/* @flow */

if (document !== undefined) {
  document.addEventListener('DOMContentLoaded', () => {
		const nextQuote = fetchQuoteHandler(document.getElementById('container'))
		const quote = document.getElementById('fetch-quote')
		quote.addEventListener('click', nextQuote)
	};
}
/*
// Libraries
import Twitter_Logo_Blue from './Twitter_Logo_Blue'

    this.state = {
      author: "Julio Cortazar",
      quote: "In quoting others, we cite ourselves.",
    }
    this.fetchQuote = this.fetchQuote.bind(this)
    this.createLink = this.createLink.bind(this)

  createLink() {
    const { quote, author } = this.state
    return 'https://twitter.com/intent/tweet'.serialize({
      'hashtags': 'quotes',
      'related': 'freecodecamp',
      'text': `"${quote}" ~${author}`,
    })
  }

  fetchQuote() {
    //Proxying call to avoid jsonp && CORS restrictions
    const opts = {
        'lang': 'en',
        'key': '111111',
        'format': 'json',
        'method': 'getQuote',
    }

    const url = 'http://api.forismatic.com/api/1.0/'.serialize(opts)

    return fetch('/quote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })
    .then(checkHeaders)
    .then(response => (
      this.setState({
        quote: response.quoteText,
        author: response.quoteAuthor || 'Author Unknown',
      })
    ))
  }

  render() {
    const { quote, author } = this.state
    const container = (
      <div className='quotebox'>
        <div className='quote'>{ quote }</div>
        <div className='text-align: center;'>{ `~${author}` }</div>
      </div>
    )
    const tweetLink = this.createLink()
    return(
      <div>
        <Navbar/>
        <div className='rq main'>
          <div>
            <div className='box'>{ container }</div>
            <div className="addendum">
              <div className='attribution'>
                API by: <a href="http://forismatic.com/en/">forismatic</a>
              </div>
              <a className="tweet" href={tweetLink}><Twitter_Logo_Blue/></a>
              <button className='refresh' onClick={this.fetchQuote}>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const checkHeaders = response => {
  if (response.status >= 400) {
    const error = new Error(`Invalid server response: ${status}`)
    error.response = response
    throw error
  }
  return response.json()
}
 */
