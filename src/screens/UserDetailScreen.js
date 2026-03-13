import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

export default function UserDetailScreen({ route }) {
  const { item } = route.params;
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
  <Image 
        source={require('../Icons/back.png')}
        style={styles.backIcon}
        />
        </TouchableOpacity>
      
        <Text style={styles.header}>User Details</Text>
      </View>
      <View style={styles.PropfileView}>
        <View style={styles.avatar}>
          <Text style={styles.nameText}>{item?.name?.charAt(0)}</Text>
        </View>

        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.username}>{item?.username}</Text>
      </View>

      <View style={styles.infoView}>
        <TitleAndDescription title="Email" description={item?.email} />
        <TitleAndDescription title="Phone" description={item?.phone} />
        <TitleAndDescription
          title="Address"
          description={`${item?.address?.street}, ${item?.address?.city}`}
        />
        <TitleAndDescription title="Website" description={item?.website} />
        <TitleAndDescription
          title="Company"
          description={item?.company?.name}
        />
      </View>
    </View>
  );
}

const TitleAndDescription = ({ title, description }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.value}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },

  PropfileView: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  nameText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  username: {
    color: 'gray',
    marginTop: 2,
  },

  infoView: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    elevation: 3,
  },

  row: {
    marginBottom: 15,
  },

  label: {
    fontSize: 12,
    color: 'grey',
    marginBottom: 3,
  },

  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  backIcon:{
    width:20,
    height:20
  },
  headerView:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:30
  },
  header:{
    fontSize:22,
    fontWeight:'bold',
    marginLeft:Dimensions.get('window').width*.23
  }
});
