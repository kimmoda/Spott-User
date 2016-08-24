import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import localized from '../../_common/localized';
import { Container, Submenu, SubmenuItem } from '../../_common/buildingBlocks';
import { tabsSelector } from '../selector';
import { SERIES } from '../../../data/mediumTypes';

@localized
@connect(tabsSelector)
export default class Tabs extends Component {

  static propTypes = {
    children: PropTypes.node,
    medium: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      shareUrl: PropTypes.string
    }),
    t: PropTypes.func
  }

  render () {
    const { children, medium, t } = this.props;
    return (
      <div>
        <Container>
          <Submenu>
            <SubmenuItem key='overview' name={t('common.overview')} pathname={`${medium.get('shareUrl')}/overview`} />
            <SubmenuItem key='scenes' name={t('medium.scenes.tabName')} pathname={`${medium.get('shareUrl')}/${medium.get('type') === SERIES ? 'season' : 'scenes'}`} />
          </Submenu>
        </Container>
        {children}
      </div>
    );
  }

}
