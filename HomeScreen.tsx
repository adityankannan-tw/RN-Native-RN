import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  NativeModules,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';

const { NativeBridge } = NativeModules;

const HomeScreen = () => {
  const [response, setResponse] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({
    mobileNumber: '',
    amount: '',
  });

  // Validate mobile number input
  const handleMobileChange = (text) => {
    // Remove any non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    
    // Limit to 10 digits
    const truncatedValue = numericValue.slice(0, 10);
    
    setMobileNumber(truncatedValue);
    
    // Set error if needed
    if (truncatedValue.length > 0 && truncatedValue.length < 10) {
      setErrors(prev => ({ ...prev, mobileNumber: 'Mobile number must be 10 digits' }));
    } else {
      setErrors(prev => ({ ...prev, mobileNumber: '' }));
    }
  };

  // Validate amount input
  const handleAmountChange = (text) => {
    // Remove any non-numeric characters except decimal point
    const cleanedText = text.replace(/[^0-9]/g, '');
    
    setAmount(cleanedText);
    
    // Validate amount
    const numAmount = Number(cleanedText);
    if (cleanedText === '') {
      setErrors(prev => ({ ...prev, amount: 'Amount is required' }));
    } else if (numAmount < 1) {
      setErrors(prev => ({ ...prev, amount: 'Amount must be at least ₹1' }));
    } else if (numAmount >= 100000) {
      setErrors(prev => ({ ...prev, amount: 'Amount must be less than ₹100,000' }));
    } else {
      setErrors(prev => ({ ...prev, amount: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { mobileNumber: '', amount: '' };
    
    // Validate mobile number
    if (!mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
      isValid = false;
    } else if (mobileNumber.length !== 10) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
      isValid = false;
    }
    
    // Validate amount
    if (!amount) {
      newErrors.amount = 'Amount is required';
      isValid = false;
    } else {
      const numAmount = Number(amount);
      if (numAmount < 1) {
        newErrors.amount = 'Amount must be at least ₹1';
        isValid = false;
      } else if (numAmount >= 100000) {
        newErrors.amount = 'Amount must be less than ₹100,000';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSendMoney = () => {
    if (!validateForm()) {
      return; // Don't proceed if validation fails
    }
    
    setShowPaymentForm(false); 
    const paymentData = {
      name: name,
      mobileNumber: mobileNumber,
      amount: amount,
      paymentType: 'UPI',
    };
    setTimeout(() => {
      NativeBridge.openSwiftUIScreen(paymentData, (result: any) => {
        setResponse(result.response);
        setName('');
        setMobileNumber('');
        setAmount('');
      });
    }, 300);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heroTitle}>React Native Screen</Text>

      <Image source={require('./assets/icici-icon.png')} style={styles.bankIcon} />

      <View style={styles.centerContent}>
        <Text style={[styles.title, { color: '#d4591c' }]}>Click on the icon to send money</Text>
        <TouchableOpacity
          style={styles.upiCircle}
          onPress={() => setShowPaymentForm(true)}
        >
          <Image
            source={require('./assets/upi-icon.png')}
            style={styles.upiIcon}
          />
          <Text style={styles.upiText}>UPI</Text>
        </TouchableOpacity>
      </View>

      {response ? (
        <Text style={styles.responseText}>
          {response}
        </Text>
      ) : null}

      <Modal
        visible={showPaymentForm}
        animationType="slide"
        transparent
        onRequestClose={() => setShowPaymentForm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Payment details</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Mobile Number"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={mobileNumber}
                onChangeText={handleMobileChange}
                keyboardType="phone-pad"
                maxLength={10}
              />
              {errors.mobileNumber ? (
                <Text style={styles.errorText}>{errors.mobileNumber}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>₹</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="Amount"
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  value={amount}
                  onChangeText={handleAmountChange}
                  keyboardType="numeric"
                />
              </View>
              {errors.amount ? (
                <Text style={styles.errorText}>{errors.amount}</Text>
              ) : null}
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.customButton,
                  {
                    backgroundColor:
                      !mobileNumber ||
                      !amount ||
                      errors.mobileNumber ||
                      errors.amount
                        ? '#CCCCCC' // Light grey when disabled
                        : 'white', // White when enabled
                  },
                ]}
                onPress={handleSendMoney}
                disabled={
                  !mobileNumber ||
                  !amount ||
                  errors.mobileNumber ||
                  errors.amount
                }
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color:
                        !mobileNumber ||
                        !amount ||
                        errors.mobileNumber ||
                        errors.amount
                          ? '#888888' // Darker grey text when disabled
                          : '#d4591c', // Orange text when enabled (matching modal background)
                    },
                  ]}
                >
                  Send Money
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.customButton, { backgroundColor: 'black' }]}
                onPress={() => setShowPaymentForm(false)}
              >
                <Text style={[styles.buttonText, { color: 'white' }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  customButton: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  minWidth: 100,
  alignItems: 'center',
  justifyContent: 'center',
},
buttonText: {
  fontSize: 16,
  fontWeight: 'bold',
},
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 50,
    alignItems: 'center',
    padding: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 8,
    paddingHorizontal: 8,
  },
  heroTitle: {
    marginLeft: -180,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#222',
  },
  headerIcon: {
    padding: 8,
  },
  infoIcon: {
    width: 28,
    height: 28,
    tintColor: '#5F259F',
  },
  subtitle: {
    width: '100%',
    fontSize: 16,
    color: '#555',
    marginBottom: 32,
    paddingHorizontal: 16,
    textAlign: 'left',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  currencySymbol: {
    fontSize: 16,
    marginRight: 5,
  },
  amountInput: {
    flex: 1,
    height: 40,
  },
  errorText: {
     color: '#FFEB3B', 
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },
  buttonRow: {
    fontWeight: 'bold',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
  responseText: {
    marginTop: 20,
    fontSize: 25,
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
  upiCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#d4591c',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  upiIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  bankIcon: {
    width: 350,
    height: 100,
    marginBottom: 5,
  },
  upiText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#d4591c',
    padding: 24,
    borderRadius: 24,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default HomeScreen;