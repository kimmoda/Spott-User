import React, { Component, PropTypes } from 'react';
import { colors, Container, fontWeights, makeTextStyle } from '../../../_common/buildingBlocks';
// import { dummySelector } from '../../selectors';
// import { dummy } from '../../actions';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import localized from '../../../_common/localized';

const icon = require('./icon.svg');

const styles = {
  wrapper: {
    backgroundColor: colors.whiteGray,
    padding: '9.125em 0',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  },
  title: {
    color: colors.dark,
    ...makeTextStyle(fontWeights.light, '2.75em', '0.04375em')
  },
  body: {
    display: 'inline-block'
  },
  info: {
    color: colors.dark,
    opacity: 0.5,
    marginTop: '0.625em',
    ...makeTextStyle(fontWeights.regular, '1.4375em', '0.03125em')
  },
  searchFieldWrapper: {
    marginTop: '3.40625em',
    boxShadow: '0 0.625em 0.75em 0 rgba(0, 0, 0, 0.3)',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  searchFieldContainer: {
    borderRadius: '0.25em',
    backgroundColor: colors.white
  },
  searchFieldIcon: {
  },
  searchField: {
    border: 0,
    borderRadius: '0.25em',
    display: 'block',
    width: '100%',
    textAlign: 'center',
    paddingLeft: '2.583em',
    paddingTop: '0.861em',
    paddingBottom: '0.861em',
    paddingRight: '0.861em',
    backgroundImage: `url(${icon})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0.861em',
    color: colors.dark,
    ...makeTextStyle(fontWeights.light, '1.125em')
  }
};
@localized
export default class Search extends Component {

  static propTypes = {
    t: PropTypes.func.isRequired
  }

  render () {
    const { t } = this.props;
    return (
      <div style={styles.wrapper}>
        <Container>
          <h1 style={styles.title}>{t('home.search.title')}</h1>
          <div style={styles.body}>
            <p style={styles.info}>{t('home.search.info')}</p>
            <div style={styles.searchFieldWrapper}>
              <div style={styles.searchFieldContainer}>
                <input placeholder={t('home.search.placeholder')} style={styles.searchField} type='text' />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

}
