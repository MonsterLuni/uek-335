import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Salary() {
  const [selectedProfession, setSelectedProfession] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const years = ['1. Lehrjahr', '2. Lehrjahr', '3. Lehrjahr', '4. Lehrjahr'];
  const months = [
    { label: '1 Monat', value: 1 },
    { label: '2 Monate', value: 2 },
    { label: '3 Monate', value: 3 },
    { label: '4 Monate', value: 4 },
    { label: '5 Monate', value: 5 },
    { label: '6 Monate', value: 6 },
    { label: '7 Monate', value: 7 },
    { label: '8 Monate', value: 8 },
    { label: '9 Monate', value: 9 },
    { label: '10 Monate', value: 10 },
    { label: '11 Monate', value: 11 },
    { label: '12 Monate', value: 12 },
  ];





  function rechner() {

    var lohn = 0;
    switch(selectedProfession) {
      case 'informatiker':
        switch(selectedYear) {
          case '1. Lehrjahr':
            lohn = 0
            
            break;
          case '2. Lehrjahr':
            lohn = 400
            
            break;
          case '3. Lehrjahr':
            lohn = 600
            
            break;
          case '4. Lehrjahr':
            lohn = 900
           
            break;
        }
        break;
      case 'mediamatiker':
        switch(selectedYear) {
          case '1. Lehrjahr':
            lohn = 0
            
            break;
          case '2. Lehrjahr':
            lohn = 0
           
            break;
          case '3. Lehrjahr':
            lohn = 600
            
            break;
          case '4. Lehrjahr':
            lohn = 900
           
            break;
        }
        break;

        
      }

      
      return `${lohn * selectedMonth} .-`
}


  const lohnrechner = rechner();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Salary Calculator</Text>
        <View style={styles.separator} />
      </View>
      <Text style={styles.ergebniss}>{lohnrechner}</Text>
      <ScrollView style={{marginBottom: 100}}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}></Text>
          <Picker
            style={styles.dropdown}
            selectedValue={selectedProfession}
            onValueChange={(itemValue) => setSelectedProfession(itemValue)}
          >
            <Picker.Item label="Informatiker/in EFZ" value="informatiker" />
            <Picker.Item label="Mediamatiker/in EFZ" value="mediamatiker" />
          </Picker>
        </View>

        <View style={styles.dropdownContainer}>
          <Text style={styles.label}></Text>
          <Picker
            style={styles.dropdown}
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
          >
            {years.map((year, index) => (
              <Picker.Item key={index} label={year} value={year} />
            ))}
          </Picker>
        </View>

        <View style={styles.dropdownContainer}>
          <Text style={styles.label}></Text>
          <Picker
            style={styles.dropdown}
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
            {months.map((month) => (
              <Picker.Item key={month.value} label={month.label} value={month.value} />

            ))}
          </Picker>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
  },
  dropdownContainer: {
    
    justifyContent: "flex-end",
    
  },
  label: {
    fontSize: 18,
    marginBottom: -10,
  },
  dropdown: {
    width: 250,
    marginBottom: 20,
    backgroundColor: 'lightgrey',
    

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#30348c",
    marginBottom: 10,
    alignSelf: "center",
    
    
  },
  separator: {
    width: 200,
    height: 2,
    backgroundColor: "#30348c",
    marginBottom: 10,
  },
  ergebniss: {
    fontSize: 48,
    fontWeight: "bold",
  }
});
