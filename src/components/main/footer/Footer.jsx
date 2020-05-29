import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'proptypes';
import moment from 'moment';
import clx from 'classnames';
import HoverOverInfo from '@components/common/HoverOverInfo';

const Footer = ({
  lastUpdated,
  version,
  backendSha,
  menuIsOpen,
}) => {
  const frontendSha = process.env.GITHUB_SHA || 'DEVELOPMENT';
  return (
    <footer
      className={clx('navbar has-navbar-fixed-bottom', { 'menu-is-open': menuIsOpen })}
    >
      { lastUpdated && (
        <span className="last-updated">
          Data Updated Through:
          &nbsp;
          {moment(lastUpdated).format('MMMM Do YYYY, h:mm:ss a')}
        </span>
      )}
      { version && backendSha && (
        <span className="version">
          <HoverOverInfo
            position="top"
            text={[
              frontendSha.substr(0, 7),
              backendSha.substr(0, 7),
            ]}
          >
            Version
            &nbsp;
            { version }
          </HoverOverInfo>
        </span>
      )}
    </footer>
  );
};

const mapStateToProps = state => ({
  lastUpdated: state.metadata.lastPulled,
  version: state.metadata.version,
  backendSha: state.metadata.gitSha,
  menuIsOpen: state.ui.menu.isOpen,
});

Footer.propTypes = {
  lastUpdated: propTypes.string,
  version: propTypes.string,
  backendSha: propTypes.string,
  menuIsOpen: propTypes.bool.isRequired,
};

Footer.defaultProps = {
  lastUpdated: undefined,
  version: undefined,
  backendSha: undefined,
};

export default connect(mapStateToProps, null)(Footer);
