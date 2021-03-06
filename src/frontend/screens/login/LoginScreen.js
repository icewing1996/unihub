import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import * as Yup from 'yup';

import colors from '~/utils/colors';
import SafeView from '~/components/copy/SafeView';
import Form from '~/components/form/Form';
import FormField from '~/components/form/FormField';
import FormButton from '~/components/form/FormButton';
import IconButton from '~/components/copy/IconButton';
import { withFirebaseHOC } from '~/../firebase';
import FormErrorMessage from '~/components/form/FormErrorMessage';
import useStatusBar from '~/hooks/useStatusBar';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter a registered email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password')
});

function LoginScreen({ navigation, firebase }) {
  useStatusBar('light-content');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function handleOnLogin(values) {
    const { email, password } = values;

    try {
      await firebase.loginWithEmail(email, password);
    } catch (error) {
      setLoginError(error.message);
    }
  }

  return (
    <SafeView style={styles.container}>
      <IconButton
            style={styles.backButton}
            iconName="keyboard-backspace"
            color={colors.primary}
            size={30}
            onPress={() => navigation.goBack()}
          />
      <View style={{flex:1, alignItems:'center', alignContent:'center'}}>
        
        <Form
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={values => handleOnLogin(values)}
        >
          <FormField
            name="email"
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
          />
          <FormField
            name="password"
            leftIcon="lock"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType="password"
            rightIcon={rightIcon}
            handlePasswordVisibility={handlePasswordVisibility}
          />
          <FormButton title={'Login'} />
          {<FormErrorMessage error={loginError} visible={true} />}
        </Form>
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeView>
  );
}

export default withFirebaseHOC(LoginScreen);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white'
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotPasswordButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600'
  },
  backButton: {
    flex:0.1
  }
});
