import { colors, fontWeights, makeTextStyle, mediaQueries, textInputStyle } from '../../_common/buildingBlocks';

export const st = {
  container: {
    display: 'block',
    paddingTop: '40px',
    paddingBottom: '40px'
  },
  title: {
    ...makeTextStyle(fontWeights.light, '23px', '0.5px'),
    margin: '0 0 20px 0'
  },
  filled: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  orders: {
    flexGrow: 1,
    marginRight: '30px',
    [mediaQueries.medium]: {
      marginRight: 0
    },
    [mediaQueries.large]: {
      marginRight: '30px'
    }
  },
  checkoutDetails: {
    minWidth: '370px',
    [mediaQueries.medium]: {
      flexGrow: 1
    },
    [mediaQueries.large]: {
      flexGrow: 0
    },
    legal: {
      ...makeTextStyle(fontWeights.light, '12px', '-0.1px', '15px'),
      color: colors.coolGray,
      marginTop: '24px',
      maxWidth: '370px'
    }
  },
  box: {
    borderRadius: '4px',
    backgroundColor: colors.white,
    border: `1px solid ${colors.borderGrey}`,
    padding: '16px 23px 19px 23px',
    marginBottom: '12px',
    empty: {
      display: 'flex',
      flexFlow: 'column',
      padding: '58px 23px 58px 23px',
      alignItems: 'center',
      justifyContent: 'center',
      fline: {
        ...makeTextStyle(fontWeights.medium, '18px', '0.2px'),
        marginTop: '24px'
      },
      sline: {
        ...makeTextStyle(fontWeights.medium, '14px', '0', '18px')
      },
      btn: {
        marginTop: '24px'
      },
      history: {
        ...makeTextStyle(fontWeights.medium, '14px', '0', '18px'),
        color: colors.coolGray,
        marginTop: '24px'
      }
    },
    title: {
      ...makeTextStyle(fontWeights.medium, '16px', '0.3px'),
      color: colors.coolGray
    },
    items: {
      marginTop: '17px'
    },
    item: {
      borderTop: `1px solid ${colors.borderGrey}`,
      padding: '13px 0 14px 0',
      display: 'flex',
      alignItems: 'center',
      image: {
        width: '60px',
        height: '60px',
        border: `1px solid ${colors.borderGrey}`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      },
      content: {
        marginLeft: '16px',
        flexGrow: 1
      },
      header: {
        display: 'flex',
        alignItems: 'center'
      },
      brand: {
        ...makeTextStyle(fontWeights.regular, '13px'),
        color: colors.coolGray
      },
      remove: {
        marginLeft: 'auto',
        ...makeTextStyle(fontWeights.regular, '18px'),
        color: colors.coolGray,
        cursor: 'pointer',
        transform: 'scaleY(0.7)'
      },
      name: {
        ...makeTextStyle(fontWeights.medium, '15px', '-0.2px', '24px'),
        color: colors.dark
      },
      footer: {
        display: 'flex',
        alignItems: 'center'
      },
      props: {
        ...makeTextStyle(fontWeights.regular, '13px'),
        color: colors.coolGray,
        display: 'flex',
        alignItems: 'center',
        prop: {
          marginRight: '7px'
        },
        b: {
          color: colors.slateGray
        }
      },
      cost: {
        marginLeft: 'auto',
        ...makeTextStyle(fontWeights.regular, '14px'),
        color: colors.slateGray
      }
    },
    delivery: {
      borderTop: `1px solid ${colors.borderGrey}`,
      padding: '18px 0',
      display: 'flex',
      alignItems: 'center',
      ...makeTextStyle(fontWeights.medium, '16px'),
      type: {
        color: colors.dark
      },
      link: {
        color: colors.darkPink,
        marginLeft: '10px',
        cursor: 'pointer',
        textDecoration: 'underline'
      },
      cost: {
        marginLeft: 'auto',
        color: colors.coolGray,
        textTransform: 'uppercase'
      }
    },
    footer: {
      borderTop: `1px solid ${colors.borderGrey}`,
      padding: '18px 0 0 0',
      display: 'flex',
      alignItems: 'center',
      ...makeTextStyle(fontWeights.regular, '16px'),
      color: colors.dark,
      totalCost: {
        marginLeft: 'auto'
      }
    },
    itemCheckout: {
      borderTop: `1px solid ${colors.borderGrey}`,
      padding: '16px 0 24px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...makeTextStyle(fontWeights.regular, '16px'),
      title: {
        color: colors.black
      },
      text: {
        ...makeTextStyle(fontWeights.regular, '14px', 0, '20px'),
        color: colors.coolGray
      },
      add: {
        color: colors.darkPink,
        cursor: 'pointer',
        alignSelf: 'flex-start',
        textDecoration: 'underline'
      },
      cvc: {
        marginTop: '15px',
        width: '138px'
      },
      cvcInput: {
        ...textInputStyle,
        width: '76px',
        marginTop: '7px'
      }
    }
  },
  greenBtn: {
    ...makeTextStyle(fontWeights.medium, '14px', '0.6px'),
    border: '0',
    borderRadius: '2px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: 'background-color 0.5s ease',
    backgroundColor: colors.coolGreen,
    padding: '0 34px',
    height: '40px',
    color: colors.white,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    ':hover': {
      opacity: 0.8
    },
    ':focus': {
      opacity: 0.9
    },
    disabled: {
      backgroundColor: colors.coolGray,
      pointerEvents: 'none',
      cursor: 'disabled'
    }
  },
  checkoutBtnWrapper: {
    width: '100%',
    borderTop: `1px solid ${colors.borderGrey}`,
    padding: '24px 0 0 0',
    display: 'flex'
  },
  deliveryModal: {
    dot: {
      width: '20px',
      height: '20px',
      border: `2px solid ${colors.borderGrey}`,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      active: {
        border: `2px solid ${colors.darkPink}`
      },
      cir: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: colors.darkPink
      }
    },
    left: {
      marginLeft: '18px'
    },
    type: {
      ...makeTextStyle(fontWeights.regular, '16px'),
      color: colors.dark
    },
    time: {
      ...makeTextStyle(fontWeights.regular, '14px', 0, '20px'),
      color: colors.coolGray
    },
    cost: {
      marginLeft: 'auto',
      ...makeTextStyle(fontWeights.regular, '16px'),
      color: colors.coolGray
    }
  },
  modal: {
    width: '430px',
    backgroundColor: colors.whiteGray,
    borderRadius: '4px',
    padding: '29px 0 26px 0',
    marginBottom: '5em',
    title: {
      ...makeTextStyle(fontWeights.light, '30px'),
      color: colors.dark,
      padding: '0 30px'
    },
    items: {
      borderTop: `1px solid ${colors.borderGrey}`,
      backgroundColor: colors.white,
      marginTop: '28px'
    },
    item: {
      borderBottom: `1px solid ${colors.borderGrey}`,
      padding: '16px 24px 12px 24px',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      ...textInputStyle,
      marginBottom: '18px'
    },
    btn: {
      width: '370px',
      marginTop: '27px',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
      height: '42px'
    },
    form: {
      borderTop: `1px solid ${colors.borderGrey}`,
      borderBottom: `1px solid ${colors.borderGrey}`,
      padding: '24px',
      backgroundColor: colors.white,
      marginTop: '28px'
    },
    label: {
      ...makeTextStyle(fontWeights.medium, '13px'),
      color: colors.slateGray,
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    footer: {
      ...makeTextStyle(fontWeights.medium, '13px', 0, '18px'),
      color: colors.slateGray,
      marginTop: '6px'
    },
    header: {
      ...makeTextStyle(fontWeights.medium, '13px', 0, '18px'),
      color: colors.slateGray,
      marginBottom: '24px'
    },
    error: {
      marginBottom: '10px',
      color: '#ff0000'
    },
    formCols: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    formRow: {
      position: 'relative'
    },
    buttons: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '27px 31px 0 31px',
      btn: {
        width: '45%',
        marginLeft: '10px',
        marginRight: '10px',
        marginTop: '0px'
      },
      remove: {
        color: colors.darkPink,
        textDecoration: 'underline',
        cursor: 'pointer',
        minWidth: '120px',
        marginRight: '30px',
        ...makeTextStyle(fontWeights.regular, '14px')
      }
    },
    radioContent: {
      marginLeft: '18px',
      title: {
        ...makeTextStyle(fontWeights.regular, '14px')
      },
      dscr: {
        ...makeTextStyle(fontWeights.regular, '14px', 0, '20px'),
        color: colors.coolGray
      }
    },
    radioEdit: {
      marginLeft: 'auto',
      alignSelf: 'flex-start',
      color: colors.darkPink,
      textDecoration: 'underline',
      fontSize: '14px',
      cursor: 'pointer'
    },
    addNewLink: {
      margin: '0 auto',
      color: colors.darkPink,
      textDecoration: 'underline',
      fontSize: '14px',
      cursor: 'pointer',
      padding: '10px 0'
    },
    greet: {
      padding: '29px 24px 0 24px',
      title: {
        ...makeTextStyle(fontWeights.medium, '14px', 0, '18px'),
        marginBottom: '30px'
      },
      dscr: {
        ...makeTextStyle(fontWeights.medium, '13px', 0, '18px'),
        color: colors.slateGray,
        head: {
          ...makeTextStyle(fontWeights.medium, '14px', 0, '18px'),
          marginBottom: '14px'
        }
      }
    }
  },
  paymentCard: {
    width: '138px',
    height: '56px',
    borderRadius: '4px',
    border: `1px solid ${colors.borderGrey}`,
    backgroundColor: colors.whiteGray,
    padding: '10px 13px 7px 13px',
    marginTop: '10px',
    name: {
      ...makeTextStyle(fontWeights.regular, '13px'),
      color: colors.slateGray
    },
    number: {
      ...makeTextStyle(fontWeights.regular, '16px', '1px', '16px'),
      color: colors.coolGray,
      marginTop: '1px',
      height: '20px',
      display: 'flex',
      dot: {
        ...makeTextStyle(fontWeights.bold, '16px')
      }
    }
  }
};
