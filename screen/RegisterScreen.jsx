import React, { useState, useLayoutEffect } from 'react'
import { KeyboardAvoidingView, SafeAreaView, Switch, ScrollView, View, Button, StyleSheet, Text, TouchableOpacity, Image, TextInput, } from 'react-native'
import { auth } from '../firebase'
import firebase from 'firebase'
import { useSelector } from 'react-redux'
import { useForm, Controller } from "react-hook-form"
import { Picker } from '@react-native-picker/picker'
import RadioGroup from 'react-native-radio-buttons-group';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        alignSelf: 'center',
        margin: 50,
    },
    userInputContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        padding: 10,
        width: 300,

    },
    userInputContaineFocus: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'red',
        padding: 10,
        width: 300,
    },
    userInputContainerLarge: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        padding: 10,
        width: 300,
        height: 200,
        textAlignVertical: "top"
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#eda488',
        backgroundColor: '#eda488',
        padding: 9,
        margin: 4,
        width: 180,
    },
    buttonText: {

    },
    errorText: {
        color: "red"
    },

});

function RegisterScreen ({ navigation }) {
    const today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayDay = days[today.getDay()]
    const todayDate = today.getDate()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const todayMonth = months[today.getMonth()]
    const todayYear = today.getFullYear()
    const currentDate = `${todayDay} ${todayDate} ${todayMonth} ${todayYear}`
    const currentHour = today.getHours()
    const currentMinutes = today.getMinutes()
    const currentSeconds = today.getSeconds()
    const currentTime = `${currentHour}:${currentMinutes}:${currentSeconds}`
    const residentOptions = [{
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Yes',
        value: 'Yes'
    }, {
        id: '2',
        label: 'No',
        value: 'No'
    }]
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => firebase.database().ref(currentDate).child("Patient:" + currentTime).set(data)



    return (
        <ScrollView >
            <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={15} style={styles.container}>
                <SafeAreaView>
                    <Text>National Health Index:</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                keyboardType='numeric'
                                placeholder="National Health Index"
                                style={styles.userInputContainer}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="nationalHealthIndex"
                        rules={{ required: true, maxLength: 10 }}
                        defaultValue=""
                    />
                    {errors.nationalHealthIndex && <Text style={styles.errorText}>This is required.</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Picker
                                selectedValue={value}
                                onValueChange={onChange}
                                onBlur={onBlur}
                                value={value}
                            >
                                <Picker.Item label=" " value=" " />
                                <Picker.Item label="Mr" value="Mr" />
                                <Picker.Item label="Mrs" value="Mrs" />
                                <Picker.Item label="Miss" value="Miss" />
                                <Picker.Item label="Ms" value="Ms" />
                            </Picker>

                        )}
                        name="title"
                        rules={{ required: true, minLength: 2 }}
                        defaultValue=""
                    />
                    {errors.title && <Text style={styles.errorText}>This is required.</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="First Name"
                                style={styles.userInputContainer}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="firstName"
                        rules={{ required: true, pattern: /^[A-Za-z]+$/i }}
                        defaultValue=""
                    />
                    {errors.firstName && <Text style={styles.errorText}>This is required.</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Last Name"
                                style={styles.userInputContainer}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="lastName"
                        rules={{ required: true, pattern: /^[A-Za-z]+$/i }}
                        defaultValue=""
                    />
                    {errors.firstName && <Text style={styles.errorText}>This is required.</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Preferred Name"
                                style={styles.userInputContainer}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="preferredName"
                        rules={{ required: true, pattern: /^[A-Za-z]+$/i }}
                        defaultValue=""
                    />
                    {errors.preferredName && <Text style={styles.errorText}>This is required.</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Address"
                                style={styles.userInputContainer}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="address"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    {errors.address && <Text style={styles.errorText}>This is required.</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                keyboardType='numeric'
                                placeholder="Phone Number"
                                style={styles.userInputContainer}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="phone"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    {errors.phone && <Text style={styles.errorText} t>This is required.</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="E-mail"
                                style={styles.userInputContainer}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="email"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    {errors.email && <Text style={styles.errorText}>This is required.</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="GP Name"
                                style={styles.userInputContainer}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="gpName"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    {errors.gpName && <Text style={styles.errorText}>This is required.</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="GP Suburb"
                                style={styles.userInputContainer}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="gpSuburb"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    {errors.gpSuburb && <Text style={styles.errorText}>This is required.</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                multiline={true}
                                placeholder="Current Medications"
                                style={styles.userInputContainerLarge}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="currentMedication"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    {errors.currentMedication && <Text style={styles.errorText}>This is required.</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                multiline={true}
                                placeholder="Drug Allergies"
                                style={styles.userInputContainerLarge}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="drugAllergies"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    {errors.drugAllergies && <Text style={styles.errorText}>This is required.</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Insurance Company"
                                style={styles.userInputContainer}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="insuranceCompany"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    {errors.insuranceCompany && <Text style={styles.errorText}>This is required.</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                keyboardType='numeric'
                                placeholder="Membership Number"
                                style={styles.userInputContainer}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="membershipNumber"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    {errors.membershipNumber && <Text style={styles.errorText}>This is required.</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <Text>Are you a NZ resident?</Text>
                                <RadioGroup
                                    layout='row'
                                    radioButtons={residentOptions}
                                    value={value}
                                    onBlur={onBlur}
                                    onPress={value => onChange(value[0].selected)}
                                />
                            </>
                        )}
                        name="nzResident"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    {errors.nzResident && <Text style={styles.errorText}>This is required.</Text>}

                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <Text>
                                    Clinical photographs are often taken as part of your medical record.
                                    On occasion these are used for educational, teaching and publication purposes.
                                    In this case your personal details are kept confidential and you will not be identified in any way.
                                    Identifiable photographs e.g. of your face or distinctive marks such as tattoos will only be used
                                    with your express written consent.
                                </Text>
                                <Text>
                                    I have read and understood the above statement
                                </Text>
                                <Switch
                                    value={value}
                                    onBlur={onBlur}
                                    trackColor={{ false: '#767577', true: 'green' }}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={value => onChange(value)}
                                />
                            </>
                        )}
                        name="consent"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    {errors.consent && <Text style={styles.errorText}>This is required.</Text>}
                    <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </SafeAreaView>

            </KeyboardAvoidingView >
        </ScrollView>
    );
}



export default RegisterScreen