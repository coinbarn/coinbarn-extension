import React from 'react';

export default class IssueTab extends React.Component {
  render() {
    return (
          <div className="issue-block more-info">
            <form action="#">
              <h5 className="tab-title">Create your token on ERGO Platform</h5>

              <label htmlFor="">
                <strong>Asset name</strong>
                <input required type="text"/>
                <p className="error">Name is already in use</p>
              </label>
              <label htmlFor="">
                <strong>Net amount</strong>
                <input required type="text"/>
                {/*    <p class="error">error</p> */}
              </label>
              <label htmlFor="">
                <strong>Decimal places</strong>
                <input required type="text"/>
                {/*    <p class="error">error</p> */}
              </label>
              <label htmlFor="">
                <strong>Brief description</strong>
                <textarea required type="text"></textarea>
                {/*    <p class="error">error</p> */}
              </label>
              <p>
                <input type="submit" value="Issue" disabled/>
              </p>
            </form>
          </div>
    );
  }
}

