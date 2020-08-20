/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'proptypes';
import { connect } from 'react-redux';
import clx from 'classnames';
import { Switch, Route } from 'react-router-dom';

import {
  toggleMenu as reduxToggleMenu,
  setMenuTab as reduxSetMenuTab,
} from '@reducers/ui';

import { MENU_TABS } from '@components/common/CONSTANTS';
import Button from '@components/common/Button';
import InfoTitle from '@components/common/InfoTitle';
import HoverOverInfo from '@components/common/HoverOverInfo';
import Submit from './Submit';
import DateSelector from './DateSelector/DateSelector';
import NCSelector from './NCSelector';
import RequestTypeSelector from './RequestTypeSelector';
import DistrictSelector from './DistrictSelector/DistrictSelector';
import ChartSelector from './ChartSelector';

const Menu = ({
  isOpen,
  activeTab,
  toggleMenu,
  setMenuTab,
}) => {
  const tabs = [
    MENU_TABS.MAP,
    MENU_TABS.VISUALIZATIONS,
  ];

  return (
    <div className="menu-container">
      <Switch>
        <Route exact path="/data">
          <div className="menu-tabs">
            {tabs.map(tab => (
              <a
                key={tab}
                className={clx('menu-tab', { active: tab === activeTab })}
                onClick={tab === activeTab ? undefined : () => setMenuTab(tab)}
              >
                { tab }
              </a>
            ))}
          </div>
        </Route>
      </Switch>

      <div className="menu-toggle-button-container">
        <HoverOverInfo
          text="Click to show/hide the filters"
          position="right"
        >
          <Button
            id="menu-toggle-button"
            icon={!isOpen ? 'chevron-right' : 'chevron-left'}
            iconStyle={{ margin: '0px' }}
            handleClick={() => toggleMenu()}
            color="light"
          />
        </HoverOverInfo>
      </div>

      <Switch>
        <Route path="/comparison">
          <div className="menu-content">
            <h1>Comparison Filters</h1>
            <InfoTitle
              title="Date Range Selection"
              element="h2"
              infoText={[
                'This filter allows the user to choose a date range for 311 comparison data.',
                '* Please click to make a selection.',
              ]}
            />
            <DateSelector comparison key="comparison-dateselector" />
            <InfoTitle
              title="District Selection"
              element="h2"
              infoText={[
                'This filter allows the user to select specific district boundaries for comparison.',
                '* Please click to select districts for comparison.',
              ]}
            />
            <DistrictSelector />
            <InfoTitle
              title="Chart Selection"
              element="h2"
              infoText={[
                'This filter allows the user to select a chart for comparison.',
                '* Please click on a chart type to make a selection.',
              ]}
            />
            <ChartSelector />
            <InfoTitle
              title="Request Type Selection"
              element="h2"
              infoText={[
                'This filter allows the user to select specific 311 request types for comparison.',
                '* Please check box to make one or more selections.',
              ]}
            />
            <RequestTypeSelector comparison />
            <Submit />
          </div>
        </Route>
        <Route path="/data">
          <div className="menu-content with-tabs">
            <h1>Filters</h1>
            <InfoTitle
              title="Date Range Selection"
              element="h2"
              infoText={[
                'This filter allows the user to choose a date range for 311 data.',
                '* Please click to make a selection.',
              ]}
            />
            <DateSelector key="data-dateselector" />
            <InfoTitle
              title="Neighborhood Council (NC) Selection"
              element="h2"
              infoText={[
                'This filter allows the user to select specific neighborhood councils.',
                '* Please check box to make one or more selections.',
              ]}
              position="top"
            />
            <NCSelector />
            <InfoTitle
              title="Request Type Selection"
              element="h2"
              infoText={[
                'This filter allows the user to select specific 311 request types.',
                '* Please check box to make one or more selections.',
              ]}
            />
            <RequestTypeSelector />
            <Submit />
          </div>
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  isOpen: state.ui.menu.isOpen,
  activeTab: state.ui.menu.activeTab,
});

const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(reduxToggleMenu()),
  setMenuTab: tab => dispatch(reduxSetMenuTab(tab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  activeTab: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func,
  setMenuTab: PropTypes.func,
};

Menu.defaultProps = {
  toggleMenu: () => null,
  setMenuTab: () => null,
};
