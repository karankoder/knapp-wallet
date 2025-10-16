import AsyncStorage from '@react-native-async-storage/async-storage';
import { ethers } from 'ethers';

const WALLET_KEY = '@crypto_wallet_private_key';
const INFURA_PROJECT_ID = process.env.EXPO_PUBLIC_INFURA_API_KEY;
const POLYGON_AMOY_RPC = `https://polygon-amoy.infura.io/v3/${INFURA_PROJECT_ID}`;

export interface WalletData {
  address: string;
  privateKey: string;
  balance: string;
  balanceInEther: string;
}

class WalletService {
  private wallet: ethers.Wallet | null = null;
  private provider: ethers.providers.JsonRpcProvider | null = null;

  /**
   * Initialize the wallet service
   * Creates a new wallet if none exists, or loads existing one
   */
  async initialize(): Promise<WalletData> {
    try {
      this.provider = new ethers.providers.JsonRpcProvider(POLYGON_AMOY_RPC);

      const storedPrivateKey = await AsyncStorage.getItem(WALLET_KEY);

      if (storedPrivateKey) {
        console.log('Loading existing wallet...');
        this.wallet = new ethers.Wallet(storedPrivateKey, this.provider);
      } else {
        console.log('Creating new wallet...');
        this.wallet = ethers.Wallet.createRandom().connect(this.provider);

        await AsyncStorage.setItem(WALLET_KEY, this.wallet.privateKey);
        console.log('New wallet created and stored!');
      }

      const balance = await this.getBalance();

      return {
        address: this.wallet.address,
        privateKey: this.wallet.privateKey,
        balance: balance.wei,
        balanceInEther: balance.ether,
      };
    } catch (error) {
      console.error('Error initializing wallet:', error);
      throw error;
    }
  }

  /**
   * Get wallet balance
   */
  async getBalance(): Promise<{ wei: string; ether: string }> {
    if (!this.wallet || !this.provider) {
      throw new Error('Wallet not initialized');
    }

    try {
      const balanceWei = await this.provider.getBalance(this.wallet.address);
      const balanceEther = ethers.utils.formatEther(balanceWei);

      return {
        wei: balanceWei.toString(),
        ether: balanceEther,
      };
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  /**
   * Get wallet address
   */
  getAddress(): string {
    if (!this.wallet) {
      throw new Error('Wallet not initialized');
    }
    return this.wallet.address;
  }

  /**
   * Send transaction
   */
  async sendTransaction(
    to: string,
    amount: string
  ): Promise<ethers.providers.TransactionResponse> {
    if (!this.wallet || !this.provider) {
      throw new Error('Wallet not initialized');
    }

    try {
      if (!ethers.utils.isAddress(to)) {
        throw new Error('Invalid recipient address');
      }
      const amountWei = ethers.utils.parseEther(amount);

      const gasPrice = ethers.utils.parseUnits('50', 'gwei');

      const gasLimit = 21000;

      const gasFeeWei = gasPrice.mul(gasLimit);

      const totalCostWei = amountWei.add(gasFeeWei);
      const balanceWei = await this.provider.getBalance(this.wallet.address);

      if (balanceWei.lt(totalCostWei)) {
        const balanceEther = ethers.utils.formatEther(balanceWei);
        const totalCostEther = ethers.utils.formatEther(totalCostWei);
        throw new Error(
          `Insufficient balance. You need ~${parseFloat(totalCostEther).toFixed(
            5
          )} MATIC for this transaction, but you only have ${parseFloat(
            balanceEther
          ).toFixed(5)} MATIC.`
        );
      }

      const tx = await this.wallet.sendTransaction({
        to,
        value: amountWei,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
      });

      console.log('Transaction sent:', tx.hash);
      return tx;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }

  /**
   * Wait for transaction confirmation
   */
  async waitForTransaction(
    txHash: string
  ): Promise<ethers.providers.TransactionReceipt> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    try {
      return await this.provider.waitForTransaction(txHash);
    } catch (error) {
      console.error('Error waiting for transaction:', error);
      throw error;
    }
  }

  /**
   * Reset wallet (delete from storage)
   */
  async resetWallet(): Promise<void> {
    try {
      await AsyncStorage.removeItem(WALLET_KEY);
      this.wallet = null;
      this.provider = null;
      console.log('Wallet reset successfully');
    } catch (error) {
      console.error('Error resetting wallet:', error);
      throw error;
    }
  }

  /**
   * Export private key (for backup purposes)
   */
  async exportPrivateKey(): Promise<string> {
    if (!this.wallet) {
      throw new Error('Wallet not initialized');
    }
    return this.wallet.privateKey;
  }
}

export const walletService = new WalletService();
