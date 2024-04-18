import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const GreenWattsContext = createContext();

export const GreenWattsContextProvider = ({ children }) => {
  const { contract } = useContract("0xab11903548dB641AA4742aa10412a8FE01A45472"); // Replace with your contract address
  const { mutateAsync: claimReward } = useContractWrite(contract, 'claimReward');
  const { mutateAsync: addEnergyProduced } = useContractWrite(contract, 'addEnergyProduced');
  const { mutateAsync: addEnergyUsed } = useContractWrite(contract, 'addEnergyUsed');

  const address = useAddress();
  const connect = useMetamask();

  const getNetEnergy = async () => {
    const netEnergy = await contract.call('getNetEnergy');
    return ethers.utils.formatEther(netEnergy.toString());
  };

  const getClaimableRewards = async () => {
    const claimableEnergy = await contract.call('getClaimableRewards');
    const rewardInWei = claimableEnergy.mul(ethers.utils.parseEther(rewardRate.toString())); // Assuming rewardRate is a public variable in your contract
    return ethers.utils.formatEther(rewardInWei.toString());
  };

  const getTotalRewardsEarned = async () => {
    const rewardsEarned = await contract.call('getTotalRewardsEarned');
    return ethers.utils.formatEther(rewardsEarned.toString());
  };

  const getTotalRewardsWithdrawn = async () => {
    const rewardsWithdrawn = await contract.call('getTotalRewardsWithdrawn');
    return ethers.utils.formatEther(rewardsWithdrawn.toString());
  };

  return (
    <GreenWattsContext.Provider
      value={{
        address,
        contract,
        connect,
        getNetEnergy,
        getClaimableRewards,
        getTotalRewardsEarned,
        getTotalRewardsWithdrawn,
        claimReward,
        addEnergyProduced,
        addEnergyUsed,
      }}
    >
      {children}
    </GreenWattsContext.Provider>
  );
};

export const useGreenWattsContext = () => useContext(GreenWattsContext);