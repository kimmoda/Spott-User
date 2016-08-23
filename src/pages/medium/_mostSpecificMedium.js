import { SERIES, MOVIE } from '../../data/mediumTypes';

export default (props) => {
  const { params: { episodeId, mediumId }, route: { mediumType } } = props;
  if (mediumType === SERIES) {
    return episodeId;
  } else if (mediumType === MOVIE) {
    return mediumId;
  }
};
