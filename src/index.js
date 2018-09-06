import React, { Fragment } from 'react';
import { render } from 'react-dom';
import isEmpty from 'lodash';
import PropTypes from 'prop-types';
import '../src/index.css';
import moment from 'moment';
import { GRAVATAR_HASH } from './constants';

function MyComponent() {
  return (
    <div className="book">
      <div className="title">The Title</div>
      <div className="author">The Author</div>
      <ul className="stats">
        <li className="rating">5 stars</li>
        <li className="isbn">12-388880-910</li>
      </ul>
    </div>
  );
}

function AnotherWayComponent() {
  return React.createElement(
    'div',
    { className: 'book' },
    React.createElement('div', { className: 'title' }, 'The Title'),
    React.createElement('div', { className: 'author' }, 'The Author'),
    React.createElement(
      'ul',
      { className: 'stats' },
      React.createElement('li', { className: 'rating' }, '5 stars'),
      React.createElement('li', { className: 'isbn' }, '12-388880-910')
    )
  );
}

function Greeting() {
  var username = 'Victor';
  // try undefine, null, true,
  return (
    <span>
      {username && !username.isEmpty ? 'Hello ' + username : 'Not logged in.'}
    </span>
  );
}

function Table() {
  return <Data />;
}

function Data() {
  return (
    <Fragment>
      <td>data 1</td>
      <td>data 2</td>
      <td>data 3</td>
    </Fragment>
  );
}

function Tweet({ tweets }) {
  return (
    <div className="tweet">
      {tweets.map(tweet => {
        const {
          id,
          gravatar,
          author,
          timestamp,
          message,
          retweets,
          likes
        } = tweet;
        return (
          <div key={id}>
            <Avatar hash={gravatar} />
            <div className="content">
              <NameWithHandle author={author} />
              <Time time={timestamp} />
              <Message message={message} />
              <div className="buttons">
                <ReplyButton />
                <RetweetButton count={retweets} />
                <LikeButton count={likes} />
                <MoreOptionsButton />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

Tweet.propTypes = {
  tweets: PropTypes.arrayOf(PropTypes.object)
};

// Fake Tweet data:
var testTweet = [
  {
    id: 1,
    message: "Hey it's an awesome tweeting Saturday!",
    gravatar: GRAVATAR_HASH,
    author: {
      handle: 'SaturdayPerson',
      name: 'My name is Saturday Person.'
    },
    likes: 200,
    retweets: 60,
    timestamp: '2016-07-30 21:24:37'
  },
  {
    id: 2,
    message: "Hey it's an awesome tweeting Saturday!",
    gravatar: GRAVATAR_HASH,
    author: {
      handle: 'SaturdayPerson',
      name: 'My name is Saturday Person.'
    },
    likes: 200,
    retweets: 60,
    timestamp: '2016-07-30 21:24:37'
  },
  {
    id: 3,
    message: "Hey it's an awesome tweeting Saturday!",
    gravatar: GRAVATAR_HASH,
    author: {
      handle: 'SaturdayPerson',
      name: 'My name is Saturday Person.'
    },
    likes: 200,
    retweets: 60,
    timestamp: '2016-07-30 21:24:37'
  }
];

function Avatar({ hash }) {
  const srcUrl = `https://s.gravatar.com/avatar/${hash}`;
  return <img src={srcUrl} className="avatar" alt="avatar" />;
}

Avatar.propTypes = {
  hash: PropTypes.string.isRequired
};

function Message({ message }) {
  return <div className="message">{message}</div>;
}

Message.propTypes = {
  message: PropTypes.string.isRequired
};

function NameWithHandle({ author }) {
  const { name, handle } = author;
  return (
    <span className="name-with-handle">
      <span className="name">{name}</span>
      <span className="handle">@{handle}</span>
    </span>
  );
}

NameWithHandle.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired
  }).isRequired
};

const Time = ({ time }) => {
  const timeString = moment(time).fromNow();
  return <span className="time">{timeString}</span>;
};

const ReplyButton = () => <i className="fa fa-reply reply-button" />;

// This can be a getRetweetCount function or a Component
const Count = ({ count }) => {
  if (count > 0) {
    return <span className="retweet-count">{count}</span>;
  } else {
    return null;
  }
};

Count.propTypes = {
  count: PropTypes.number
};

const RetweetButton = ({ count }) => (
  <span className="retweet-button">
    <i className="fa fa-retweet" />
    <Count count={count} />
  </span>
);

RetweetButton.propTypes = {
  count: PropTypes.number
};

const LikeButton = ({ count }) => (
  <span className="like-button">
    <i className="fa fa-heart" />
    <span className="like-count">{count ? count : null}</span>
  </span>
);

LikeButton.propTypes = {
  count: PropTypes.number
};

const MoreOptionsButton = () => (
  <i className="fa fa-ellipsis-h more-options-button" />
);

const Name = ({ name }) => {
  return <span className="address-name">{name}</span>;
};

const Address = ({ address }) => {
  const { location, city } = address;
  return (
    <div className="address-card">
      <div>{location}</div>
      <div>{city}</div>
    </div>
  );
};

const testPerson = {
  name: "person's name",
  address: {
    location: '77th Street Lane 2.',
    city: 'Boston, MA, 22345'
  }
};

const fromMailingLabel = {
  name: 'From Mr X.',
  address: {
    location: '77th Street Lane 2.',
    city: 'Boston, MA, 22345'
  }
};

const toMailingLabel = {
  name: 'To Miss Y.',
  address: {
    location: 'Peking Street Ring 5.',
    city: 'Beijing, CN, 88444'
  }
};

const AddressLabel = ({ person, className }) => {
  const { name, address } = person;
  return (
    <div className={`${className}`}>
      <Name name={name} />
      <Address address={address} />
    </div>
  );
};

AddressLabel.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.shape({
      location: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired
    }).isRequired
  })
};

const Stamp = () => {
  return <div className="stamp">Stamp</div>;
};

const Envelope = ({ toPerson, fromPerson }) => {
  return (
    <div className="envelope">
      <AddressLabel className="from-label" person={fromPerson} />
      <AddressLabel className="to-label" person={toPerson} />
      <Stamp />
    </div>
  );
};

Envelope.propTypes = {
  toPerson: PropTypes.object,
  fromPerson: PropTypes.object
};

// render(<Tweet tweets={testTweet} />, document.getElementById('root'));
// render(<AddressLabel person={testPerson} />, document.getElementById('root'));
render(
  <Envelope toPerson={toMailingLabel} fromPerson={fromMailingLabel} />,
  document.getElementById('root')
);
