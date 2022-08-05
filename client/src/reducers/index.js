export const initialState = {
  logged: false,
  account: null,
  stakeInputValue: '',
  unstakeInputValue: '',
  tokens: [
    {
      name: 'Ethereum',
      symbol: 'ETH',
      apr: 0.039,
      price: 1602,
      totalStaked: 0,
      estimatedFAMRewards: 0,
      initialStakingDate: null,
      earnedFAM: 0,
    },
    {
      name: 'Dai',
      symbol: 'DAI',
      apr: 0.027,
      price: 1,
      totalStaked: 0,
      estimatedFAMRewards: 0,
      initialStakingDate: null,
      earnedFAM: 0,
    },
    {
      name: 'Family token',
      symbol: 'FAM',
      apr: 0.1,
      price: 17,
      totalStaked: 0,
      estimatedFAMRewards: 0,
      initialStakingDate: null,
      earnedFAM: 0,
    },
  ]
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_STAKING_VALUE':
      return {
        ...state,
        stakeInputValue: action.value,
      }
    case 'CHANGE_UNSTAKING_VALUE':
      return {
        ...state,
        unstakeInputValue: action.value,
      }
    case 'STAKE': {
      // On recup le token FAM
      const FAMToken = state.tokens.find((token) => token.symbol === "FAM");
      // On recup le token a stake
      const tokenToStake = state.tokens.find((token) => token.symbol === action.token);
      // On rajoute le montant a stake
      tokenToStake.totalStaked += parseInt(state.stakeInputValue);
      // Calcul des estimated rewards en FAM
      tokenToStake.estimatedFAMRewards = (tokenToStake.price * tokenToStake.totalStaked * tokenToStake.apr) / FAMToken.price;
      return {
        ...state,
        stakeInputValue: '',
        tokens: [
          ...state.tokens,
          tokenToStake
        ]
      }
    }
    case 'UNSTAKE': {
      const tokenToUnstake = state.tokens.find((token) => token.symbol === action.token);
      tokenToUnstake.totalStaked = tokenToUnstake.totalStaked - Number(state.unstakeInputValue);
      tokenToUnstake.estimatedFAMRewards = 0;
      // TODO: Fonction calcul rewards 
      tokenToUnstake.earnedFAM += 0.04712;
      return {
        ...state,
        unstakeInputValue: '',
        tokens: [
          ...state.tokens,
          tokenToUnstake
        ]
      }
    }
    default:
      return state;
  }
};

export default reducer;