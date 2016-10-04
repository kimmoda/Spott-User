import { COMMERCIAL, SERIES, MOVIE } from '../../data/mediumTypes';

export default (props) => {
  const { params: { episodeId, mediumId }, route: { mediumType } } = props;
  switch (mediumType) {
    case COMMERCIAL:
    case MOVIE:
      return mediumId;
    case SERIES:
      return episodeId;
  }
};
