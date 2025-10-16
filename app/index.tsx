import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import React, { useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardHeader = ({
  isConnected,
  onDisconnect,
}: {
  isConnected: boolean;
  onDisconnect: () => void;
}) => (
  <View className='w-full px-6 pt-2 pb-8 border-b border-card'>
    <View className='flex-row items-center justify-between'>
      <View className='flex-row items-center flex-1'>
        <View className='w-14 h-14 bg-primary/20 rounded-full justify-center items-center'>
          <FontAwesome5 name='wallet' size={24} color='#8B5CF6' />
        </View>
        <View className='ml-4'>
          <Text className='text-text-secondary text-sm font-medium'>
            Welcome back
          </Text>
          <Text className='text-text-primary text-2xl font-bold'>
            Your Assets
          </Text>
        </View>
      </View>
      {isConnected && (
        <TouchableOpacity
          onPress={onDisconnect}
          className='w-10 h-10 bg-red-500/10 rounded-full justify-center items-center active:bg-red-500/20'
        >
          <Feather name='log-out' size={20} color='#EF4444' />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const WalletDetails = () => {
  const copyToClipboard = async () => {
    const mockAddress = '0x1234...AbCd';
    await Clipboard.setStringAsync(mockAddress);
    Alert.alert('Copied!', 'Mock address copied to clipboard.');
  };

  return (
    <View className='flex-1 w-full px-6 pt-6'>
      {/* Network Badge */}
      <View className='mb-8'>
        <View className='bg-primary/10 px-4 py-2 rounded-full w-fit'>
          <Text className='text-primary text-xs font-semibold tracking-wide'>
            POLYGON MUMBAI TESTNET
          </Text>
        </View>
      </View>

      {/* Main Balance Card */}
      <View className='bg-gradient-to-br from-primary/30 to-primary/10 p-8 rounded-3xl mb-8 border border-primary/20'>
        <Text className='text-text-secondary text-sm font-medium mb-3'>
          Total Balance
        </Text>
        <Text className='text-5xl font-black text-text-primary mb-2'>
          12.3456
        </Text>
        <Text className='text-primary font-semibold text-lg'>MATIC</Text>
        <View className='mt-4 pt-4 border-t border-white/5'>
          <Text className='text-text-secondary text-xs'>≈ $4,234.56 USD</Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View className='flex-row gap-3 mb-8'>
        <View className='flex-1 bg-card p-4 rounded-2xl border border-white/5'>
          <Text className='text-text-secondary text-xs font-medium mb-2'>
            Transactions
          </Text>
          <Text className='text-text-primary text-2xl font-bold'>24</Text>
        </View>
        <View className='flex-1 bg-card p-4 rounded-2xl border border-white/5'>
          <Text className='text-text-secondary text-xs font-medium mb-2'>
            Last Active
          </Text>
          <Text className='text-text-primary text-sm font-bold'>2h ago</Text>
        </View>
      </View>

      {/* Wallet Address Card */}
      <View className='bg-card p-4 rounded-2xl mb-8 border border-white/5 flex-row items-center justify-between'>
        <View className='flex-row items-center flex-1'>
          <View className='w-10 h-10 bg-primary/20 rounded-full justify-center items-center'>
            <FontAwesome name='shield' size={18} color='#8B5CF6' />
          </View>
          <Text
            className='text-sm text-text-secondary font-mono flex-1 ml-3'
            numberOfLines={1}
            ellipsizeMode='middle'
          >
            0x1234567890AbCd...345678
          </Text>
        </View>
        <TouchableOpacity
          onPress={copyToClipboard}
          className='ml-2 p-2 active:bg-white/5 rounded-lg'
        >
          <FontAwesome name='copy' size={18} color='#8B5CF6' />
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View className='flex-row gap-3'>
        <TouchableOpacity className='flex-1 bg-primary py-4 rounded-2xl items-center justify-center active:bg-primary/80'>
          <View className='flex-row items-center justify-center'>
            <Feather name='send' size={20} color='white' />
            <Text className='text-text-primary text-lg font-bold ml-2'>
              Send
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className='flex-1 bg-card border border-primary/30 py-4 rounded-2xl items-center justify-center active:bg-white/5'>
          <View className='flex-row items-center justify-center'>
            <Feather name='arrow-down-left' size={20} color='#8B5CF6' />
            <Text className='text-primary text-lg font-bold ml-2'>Receive</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ConnectWalletPrompt = ({ onConnect }: { onConnect: () => void }) => (
  <View className='flex-1 justify-center items-center w-full px-6'>
    <View className='w-full items-center'>
      <View className='w-24 h-24 bg-primary/20 rounded-full justify-center items-center mb-8'>
        <FontAwesome5 name='wallet' size={48} color='#8B5CF6' />
      </View>

      <Text className='text-text-primary text-3xl font-black text-center mb-3'>
        Connect Your Wallet
      </Text>

      <Text className='text-text-secondary text-base text-center mb-8 leading-6'>
        Start managing your crypto assets. Connect your wallet to view balances,
        send transactions, and more.
      </Text>

      {/* Feature list */}
      <View className='w-full bg-card rounded-2xl p-6 mb-8 border border-white/5'>
        <FeatureItem icon='check-circle' text='View your balance' />
        <FeatureItem icon='send' text='Send & receive crypto' />
        <FeatureItem icon='lock' text='Secure & encrypted' />
      </View>

      <TouchableOpacity
        className='w-full bg-primary py-4 rounded-2xl items-center justify-center active:bg-primary/80'
        onPress={onConnect}
      >
        <Text className='text-text-primary text-lg font-bold'>
          Connect Wallet
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const FeatureItem = ({ icon, text }: { icon: string; text: string }) => (
  <View className='flex-row items-center mb-4 last:mb-0'>
    <Feather name={icon as any} size={20} color='#8B5CF6' />
    <Text className='text-text-secondary ml-3 text-base'>{text}</Text>
  </View>
);

export default function DashboardScreen() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    console.log('Connect button pressed.');
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    console.log('Disconnect button pressed.');
    setIsConnected(false);
  };

  return (
    <SafeAreaView
      className='flex-1 bg-background'
      edges={['top', 'left', 'right']}
    >
      <StatusBar barStyle='light-content' />
      <View className='flex-1'>
        <DashboardHeader
          isConnected={isConnected}
          onDisconnect={handleDisconnect}
        />

        {isConnected ? (
          <WalletDetails />
        ) : (
          <ConnectWalletPrompt onConnect={handleConnect} />
        )}
      </View>
    </SafeAreaView>
  );
}
