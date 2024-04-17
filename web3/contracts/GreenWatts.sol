// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract GreenWatts {
    // struct Energy {
    //     address owner;
    //     address tokenAddress;
    //     uint256 balance;
    //     uint256 rewardAmount;
    //     uint256[] prevRewards;
    // }

    // Reward rate per unit of net energy (for simulation purposes)
    uint public rewardRate = 1; // Replace with desired reward rate per unit

    // Avg energy usage (hardcoded)
    uint public avgUsage = 10;

    // Mapping to store claimable energy (net energy) for each address
    mapping(address => uint) public claimableEnergy;

    // Mapping to store total rewards earned by each address
    mapping(address => uint) public totalRewardsEarned;

    // Mapping to store total rewards withdrawn by each address
    mapping(address => uint) public totalRewardsWithdrawn;

    // Event to signal reward minting
    event RewardClaimed(address user, uint amount);

    // Function to simulate adding energy produced by the user
    function addEnergyProduced(uint _amount) public {
        claimableEnergy[msg.sender] += _amount;
    }

    // Function to simulate adding energy used by the user
    function addEnergyUsed(uint _amount) public {
        claimableEnergy[msg.sender] -= (avgUsage - _amount);
    }

    // Function to calculate and display the net energy (claimable)
    function getNetEnergy() public view returns(uint) {
        return claimableEnergy[msg.sender];
    }

    // Dummy function for adding new meter connections (prototype)
    function addNewMeterConnection() public {
        // Implement logic to handle meter connection in a real scenario
    }

    // Function to display the amount of claimable rewards (simulated)
    function getClaimableRewards() public view returns(uint) {
        return claimableEnergy[msg.sender] * rewardRate;
    }

    // Function to calculate total rewards earned so far
    function getTotalRewardsEarned() public view returns(uint) {
        return totalRewardsEarned[msg.sender];
    }

    // Function to calculate total rewards withdrawn so far
    function getTotalRewardsWithdrawn() public view returns(uint) {
        return totalRewardsWithdrawn[msg.sender];
    }

    // Function to simulate claiming a specific amount of claimable energy as rewards
    function claimReward(uint _amount) public {
        require(_amount <= claimableEnergy[msg.sender], "Insufficient claimable energy");
        claimableEnergy[msg.sender] -= _amount;
        uint rewardAmount = _amount * rewardRate;
        totalRewardsEarned[msg.sender] += rewardAmount;
        emit RewardClaimed(msg.sender, rewardAmount); // Simulate reward issuance
    }
}