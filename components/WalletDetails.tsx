import { Feather, FontAwesome } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WalletData, walletService } from '../services/walletService';
import { TransactionModal } from './TransactionModal';

export const WalletDetails = ({
  walletData,
  onRefresh,
}: {
  walletData: WalletData | null;
  onRefresh: () => void;
  isRefreshing: boolean;
}) => {
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const copyToClipboard = async () => {
    if (walletData?.address) {
      await Clipboard.setStringAsync(walletData.address);
      Alert.alert('Copied!', 'Wallet address copied to clipboard.');
    }
  };

  const handleSend = async (to: string, amount: string) => {
    setIsSending(true);
    try {
      const tx = await walletService.sendTransaction(to, amount);
      Alert.alert('Transaction Sent!', `Transaction hash: ${tx.hash}`, [
        {
          text: 'OK',
          onPress: () => {
            setSendModalVisible(false);
            onRefresh();
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send transaction');
    } finally {
      setIsSending(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 6
    )}`;
  };

  if (!walletData) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' color='#8B5CF6' />
        <Text className='text-text-secondary mt-4'>Loading wallet...</Text>
      </View>
    );
  }

  return (
    <ScrollView className='flex-1 w-full' showsVerticalScrollIndicator={false}>
      <View className='px-6 pt-6 pb-8'>
        <View className='mb-6'>
          <View className='bg-primary/10 px-4 py-2 rounded-full self-start flex-row items-center'>
            <View className='w-2 h-2 bg-green-500 rounded-full mr-2' />
            <Text className='text-primary text-xs font-semibold tracking-wide'>
              POLYGON AMOY TESTNET
            </Text>
          </View>
        </View>

        <View className='bg-gradient-to-br from-primary/30 to-primary/10 p-8 rounded-3xl mb-6 border border-primary/20'>
          <Text className='text-text-secondary text-sm font-medium mb-3'>
            Total Balance
          </Text>
          <View className='flex-row items-baseline'>
            <Text className='text-5xl font-black text-text-primary'>
              {parseFloat(walletData.balanceInEther).toFixed(4)}
            </Text>
            <Text className='text-primary font-semibold text-xl ml-2'>
              MATIC
            </Text>
          </View>
        </View>

        <View className='bg-card p-5 rounded-2xl mb-6 border border-white/5'>
          <View className='flex-row items-center mb-3'>
            <View className='w-10 h-10 bg-primary/20 rounded-full justify-center items-center'>
              <FontAwesome name='shield' size={18} color='#8B5CF6' />
            </View>
            <Text className='text-text-secondary text-xs font-semibold ml-3'>
              YOUR WALLET ADDRESS
            </Text>
          </View>
          <View className='flex-row items-center justify-between'>
            <Text
              className='text-sm text-text-primary font-mono flex-1'
              numberOfLines={1}
              ellipsizeMode='middle'
            >
              {walletData.address}
            </Text>
            <TouchableOpacity
              onPress={copyToClipboard}
              className='ml-3 p-2 bg-primary/10 rounded-lg active:bg-primary/20'
            >
              <FontAwesome name='copy' size={18} color='#8B5CF6' />
            </TouchableOpacity>
          </View>
        </View>

        <View className='flex-row gap-3 mb-6'>
          <TouchableOpacity
            className='flex-1 bg-primary py-4 rounded-2xl items-center justify-center active:bg-primary/80'
            onPress={() => setSendModalVisible(true)}
          >
            <Feather name='send' size={20} color='white' />
            <Text className='text-white text-base font-bold mt-1'>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='flex-1 bg-card border border-primary/30 py-4 rounded-2xl items-center justify-center active:bg-white/5'
            onPress={copyToClipboard}
          >
            <Feather name='arrow-down-left' size={20} color='#8B5CF6' />
            <Text className='text-primary text-base font-bold mt-1'>
              Receive
            </Text>
          </TouchableOpacity>
        </View>

        <View className='bg-primary/5 p-5 rounded-2xl border border-primary/20'>
          <View className='flex-row items-start'>
            <View className='w-8 h-8 bg-primary/20 rounded-full justify-center items-center mr-3'>
              <Feather name='info' size={16} color='#8B5CF6' />
            </View>
            <View className='flex-1'>
              <Text className='text-text-primary text-sm font-semibold mb-1'>
                Testnet Wallet
              </Text>
              <Text className='text-text-secondary text-xs leading-5'>
                This is a test wallet on Polygon Amoy. Your private key is
                stored securely on your device. Get free testnet MATIC from
                faucets to test transactions.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TransactionModal
        visible={sendModalVisible}
        onClose={() => setSendModalVisible(false)}
        onSend={handleSend}
        isSending={isSending}
      />
    </ScrollView>
  );
};
