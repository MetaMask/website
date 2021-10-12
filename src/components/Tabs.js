import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';


/**
 * @name - Tabs
 * @summary - Renders bar full-width TabBar with interactive elements
 * @description - 
 * @prop {Array} tabs - list of tabs and callback functions for clicking each. Takes shape of  { text <String> ,  callback <function> }
 * @prop {Element} rightIconEl - React element to render in the far right corner of the tabs bar, typically a search bar or legend.
 * @prop {String} selectedTab - Identifier for most recently selected tab
 * 
 */
const Tabs = (props) => {
  const {
    rightIconEl : RightElement,
    selectedTab,
    tabs,
  } = props;

  const renderTabs = () =>
   tabs && tabs.map(({
      text,
      callback,
      key
    }) => (
      <TabText
        key={key}
        onClick={callback}
        active={selectedTab === key}
      >
        {text}
      </TabText>
    ));

  return (
    <TabsBarContainer>
      <TabsBar>
        <TabContainer>
          {renderTabs()}
        </TabContainer>
        {RightElement && <RightElement />}
      </TabsBar>
    </TabsBarContainer>

  );
}

export default Tabs; 

Tabs.propTypes = {
  RightElement: PropTypes.element,
  selectedTab: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      callback: PropTypes.func.isRequired,
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};


const TabsBarContainer = styled.div`
  width: 100vw;
  padding: 0 1.25em;
  background-color: ${({theme}) => theme.primaryColor};
`;

const TabsBar = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${({theme}) => theme.container.wide};
  min-height: 80px;
  margin: 0 auto;
`;

const TabContainer = styled.div`
  display: flex;
  flex: 3;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

const TabText = styled.p`
  display: inline-block;
  align-self: center;
  height: 100%;
  margin: ${({theme}) => theme.font.size.md}rem;
  opacity: ${({active}) => active ? "1" :  "0.4"};
  color:  ${({theme}) => theme.secondaryColor};
  font-size: ${({theme}) => theme.font.size.md}rem;
  text-transform: uppercase;
  cursor: pointer;
`;
