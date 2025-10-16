import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const TransactionModal = ({
  visible,
  onClose,
  onSend,
  isSending,
}: {
  visible: boolean;
  onClose: () => void;
  onSend: (to: string, amount: string) => void;
  isSending: boolean;
}) => {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = () => {
    if (!toAddress || !amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    onSend(toAddress, amount);
  };

  const handleClose = () => {
    setToAddress('');
    setAmount('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType='slide'
      onRequestClose={handleClose}
    >
      <View className='flex-1 bg-black/50 justify-end'>
        <View className='bg-background rounded-t-3xl p-6 pt-8'>
          <View className='flex-row items-center justify-between mb-6'>
            <Text className='text-text-primary text-2xl font-bold'>
              Send MATIC
            </Text>
            <TouchableOpacity
              onPress={handleClose}
              className='w-10 h-10 bg-card rounded-full justify-center items-center'
              disabled={isSending}
            >
              <Feather name='x' size={20} color='#8B5CF6' />
            </TouchableOpacity>
          </View>

          <View className='mb-4'>
            <Text className='text-text-secondary text-sm font-medium mb-2'>
              Recipient Address
            </Text>
            <TextInput
              className='bg-card p-4 rounded-xl border border-white/5 text-text-primary text-sm font-mono'
              placeholder='0x...'
              placeholderTextColor='#666'
              value={toAddress}
              onChangeText={setToAddress}
              editable={!isSending}
            />
          </View>

          <View className='mb-6'>
            <Text className='text-text-secondary text-sm font-medium mb-2'>
              Amount (MATIC)
            </Text>
            <View className='bg-card p-4 rounded-xl border border-white/5 flex-row items-center justify-between'>
              <TextInput
                className='text-text-primary text-sm flex-1'
                placeholder='0.00'
                placeholderTextColor='#666'
                keyboardType='decimal-pad'
                value={amount}
                onChangeText={setAmount}
                editable={!isSending}
              />
            </View>
          </View>

          <TouchableOpacity
            className='w-full bg-primary py-4 rounded-2xl items-center justify-center active:bg-primary/80 mb-4'
            onPress={handleSend}
            disabled={isSending}
          >
            {isSending ? (
              <ActivityIndicator color='white' />
            ) : (
              <Text className='text-white text-lg font-bold'>
                Send Transaction
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
