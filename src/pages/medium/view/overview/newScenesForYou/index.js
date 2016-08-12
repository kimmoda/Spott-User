import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { colors, Container, Message } from '../../../../_common/buildingBlocks';
import localized from '../../../../_common/localized';
import SceneTiles from '../../../../_common/tiles/sceneTiles';
import { newScenesForYouSelector } from '../../../selector';
import { loadNewScenesForYou } from '../../../actions';

@localized
@connect(newScenesForYouSelector, (dispatch) => ({
  loadNewScenesForYou: bindActionCreators(loadNewScenesForYou, dispatch)
}))
@Radium
export default class PickedForYou extends Component {

  static propTypes = {
    loadNewScenesForYou: PropTypes.func.isRequired,
    mediumId: PropTypes.string.isRequired,
    scenes: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list
    }),
    t: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.loadNewScenesForYou(this.props.mediumId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.mediumId !== nextProps.mediumId) {
      this.props.loadNewScenesForYou(nextProps.mediumId);
    }
  }

  static styles = {
    subtitle: {
      marginBottom: '1.304em'
    },
    wrapper: {
      backgroundColor: colors.whiteGray,
      paddingTop: '2.5em',
      paddingBottom: '3.25em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { scenes, t } = this.props;

    return (
      <div style={styles.wrapper}>
        <Container>
          <SceneTiles
            items={scenes}
            renderEmptyComponent= {() => <Message>{t('medium.newScenesForYou.empty')}</Message>}
            renderNotFoundComponent={() => <Message>{t('common.notFound')}</Message>}
            renderUnexpectedComponent={() => <Message>{t('common.unexpected')}</Message>}
            title={t('medium.newScenesForYou.title')} />
        </Container>
      </div>
    );
  }

}
