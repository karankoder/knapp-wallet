import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DashboardHeader } from '../components/DashboardHeader';
import { WalletDetails } from '../components/WalletDetails';
import { WalletData, walletService } from '../services/walletService';

export default function DashboardScreen() {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    initializeWallet();
  }, []);

  const initializeWallet = async () => {
    try {
      setIsLoading(true);
      const data = await walletService.initialize();
      setWalletData(data);
    } catch (error) {
      console.error('Error initializing wallet:', error);
      Alert.alert(
        'Error',
        'Failed to initialize wallet. Please restart the app.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBalance = async () => {
    try {
      setIsRefreshing(true);
      const balance = await walletService.getBalance();

      setWalletData((prev) =>
        prev
          ? {
              ...prev,
              balance: balance.wei,
              balanceInEther: balance.ether,
            }
          : null
      );
    } catch (error) {
      console.error('Error refreshing balance:', error);
      Alert.alert('Error', 'Failed to refresh balance');
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView
        className='flex-1 bg-background'
        edges={['top', 'left', 'right']}
      >
        <StatusBar barStyle='light-content' />
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' color='#8B5CF6' />
          <Text className='text-text-secondary mt-4'>
            Initializing wallet...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className='flex-1 bg-background'
      edges={['top', 'left', 'right']}
    >
      <StatusBar barStyle='light-content' />
      <View className='flex-1'>
        <DashboardHeader
          onRefresh={refreshBalance}
          isRefreshing={isRefreshing}
        />
        <WalletDetails
          walletData={walletData}
          onRefresh={refreshBalance}
          isRefreshing={isRefreshing}
        />
      </View>
    </SafeAreaView>
  );
}
