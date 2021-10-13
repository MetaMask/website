import PropTypes from 'prop-types';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent';

const HeroContainerComponent = (props) => {
  const {
    backgroundImage,
    CTA,
    header,
    HeroImage,
    subtitle,
    theme,
    themeOverride,
    title,
    SideText,
    modules
  } = props;
  if(themeOverride && typeof themeOverride === 'object'){
    Object.keys(themeOverride).forEach((k) => themeOverride[k] == null && delete themeOverride[k])
  }
  const heroTheme = {...theme, hero: {...theme.hero,...themeOverride}};
  return (
    <HeroContainer theme={heroTheme} image={backgroundImage}>
      <HeroContentContainer theme={heroTheme}>
        <HeroImageTextContainer>
          {header && <HeroHeader> {header} </HeroHeader>}
          {title && <HeroTitle> {title} </HeroTitle>}
          {subtitle && !title && <HeroSubTitle theme={heroTheme}> {subtitle} </HeroSubTitle>}
          {SideText && !subtitle && SideText}
          <ModulesWrapper>
            {modules && modules.length ? modules.map(m =>
              contentfulModuleToComponent({
                ...m,
                childHeroContainer: true,
                fontWeightManual: true,
              })
            ) : null}
          </ModulesWrapper>
        </HeroImageTextContainer>

        <HeroCTA>
          {CTA}
        </HeroCTA>
      </HeroContentContainer>
      {HeroImage || null}
    </HeroContainer>
  );
}

export default withTheme(HeroContainerComponent);

HeroContainerComponent.propTypes = {
  backgroundImage: PropTypes.string,
  button: PropTypes.element,
  header: PropTypes.string,
  HeroImage: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  theme:  PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  modules: PropTypes.arrayOf(PropTypes.object.isRequired),
};

const ModulesWrapper = styled.div`
  /* special case for hero about */
  > * {
    margin: 0 !important;
    padding: 0 !important;
  }
  > *:last-child {
    margin-bottom: 0 !important;
  }
  > div:nth-child(2) {
    h3 {
      margin-bottom: 12px;
    }
  }
  > div:nth-child(3) {
    margin-top: 2rem !important;
    h3 {
      margin: 0;
    }
  }
  h1,h2,h3,h4, h5, h6{
    &:last-child {
      margin-bottom: 0;
    }
  }
  h3 {
    margin-bottom: 1.25rem;
  }
  h4 {
    margin-bottom: 0;
  }
  p:empty {
    display: none;
  }
`;

const HeroContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  min-width: 100%;
  padding: 0;
  background-color: ${({theme}) => theme.primaryColor};
  color: ${({theme}) => theme.theme === 'light'
    ? theme.black : theme.white};
  h1, h2, h3, h4, h5, h6 {
    color: ${({theme}) => theme.theme === 'light'
    ? theme.black : theme.white};
  }
  ${({ image }) => image ?
  ` background-image: url(${image});
    background-size: cover;
   ` : ""}

  @media(min-width: ${({theme}) => theme.device.desktop}) {
    min-height: ${({theme}) => theme.hero.heroHeight};
    /* padding: 4em 1.25rem; */
  }
`;

const HeroContentContainer = styled.section`
  z-index: 100;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  @media(min-width: ${({theme}) => theme.device.desktop}) {
    width: ${({theme}) => theme.heroContentWidth || theme.container.wide};
    margin-top: 88px;
    padding: ${({theme}) => theme.hero.heroPadding} 0;
  }
`;

const HeroImageTextContainer = styled.div`
  letter-spacing: 0.1em;
  @media(min-width: ${({theme}) => theme.device.mobile}) {
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

const HeroTitle = styled.h1`
  color: ${({theme, color}) =>
    color || (theme.theme === 'light'
    ? theme.black : theme.white)};
  font-weight: ${({theme}) => theme.font.weight.bold};
  @media(min-width: ${({theme}) => theme.device.desktop}) {
    flex: 1;
    margin-bottom: 0;
    font-size: 5.96rem;
    word-wrap: break-word;
    word-spacing: 0.15em;
  }
`;

const HeroHeader = styled.p`
  color: ${({theme, color}) =>
    color || (theme.theme === 'light'
    ? theme.black : theme.white)};
  @media(min-width: ${({theme}) => theme.device.desktop}) {
    margin-bottom: 30px;
    font-size: ${({theme}) => theme.font.size.md}rem;
    font-weight: ${({theme}) => theme.font.weight.semiBold}; 
    letter-spacing: 1px;
    text-transform: uppercase;
  } 
`;

const HeroSubTitle = styled.h1`
  margin-bottom: 3rem;
  color: ${({theme, color}) =>
    color || (theme.theme === 'light'
    ? theme.black : theme.white)};
  font-weight: ${({theme}) => theme.font.weight.bold};
  letter-spacing: -0.4px;
  font-size: 2.5rem;
  @media(min-width: ${({theme}) => theme.device.tablet}) {
    max-width: 824px;
    font-size: ${({theme}) => theme.hero.heroFontSize};
  }
  @media(min-width: ${({theme}) => theme.device.desktop}) {
    margin-bottom: 3.5rem;
    line-height: ${({theme}) => theme.hero.heroLineHeight};
  }
`;

export const SideText = styled.div`
  position: absolute;
  top: 55%;
  left: 40%;
  width: 50%;
  max-width: 675px;
  color: ${({theme}) =>
    (theme.theme === 'light'
    ? theme.black : theme.white)};
  font-size: ${({theme}) => theme.font.size.md}rem;
  line-height: ${({theme}) => theme.font.size.xl}rem;
`;

export const HeroCTA = styled.div`
  @media(min-width: ${({theme}) => theme.device.desktop}) {
    display: inline-block;
    margin-bottom: 15px;
    font-size: ${({theme}) => theme.font.size.xl}rem;
    cursor: pointer;
  }
`;
