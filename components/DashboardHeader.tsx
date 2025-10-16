import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

export const DashboardHeader = ({
  onRefresh,
  isRefreshing,
}: {
  onRefresh: () => void;
  isRefreshing: boolean;
}) => (
  <View className='w-full px-6 pt-2 pb-6 border-b border-card'>
    <View className='flex-row items-center justify-between'>
      <View className='flex-row items-center flex-1'>
        <View className='w-14 h-14 bg-primary/20 rounded-full justify-center items-center'>
          <FontAwesome5 name='wallet' size={24} color='#8B5CF6' />
        </View>
        <View className='ml-4'>
          <Text className='text-text-secondary text-sm font-medium'>
            Your Wallet
          </Text>
          <Text className='text-text-primary text-2xl font-bold'>
            Dashboard
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onRefresh}
        disabled={isRefreshing}
        className='w-10 h-10 bg-card rounded-full justify-center items-center border border-white/5 active:bg-white/5'
      >
        {isRefreshing ? (
          <ActivityIndicator size='small' color='#8B5CF6' />
        ) : (
          <Feather name='refresh-cw' size={20} color='#8B5CF6' />
        )}
      </TouchableOpacity>
    </View>
  </View>
);
