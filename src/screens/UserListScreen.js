import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, clearUsers } from '../redux/userSlice';
import { getUsersApi } from '../services/api';

const limit = 5;

export default function UserListScreen({ navigation }) {
  const dispatch = useDispatch();

  const { users } = useSelector(state => state.users);
  const onReachedMomentRef = useRef(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsersFunction();
  }, [page]);

  const loadUsersFunction = async () => {
    try {
      setLoading(true);
      const response = await getUsersApi({ page, limit });
      console.log(response?.data?.length, 'sdhfdfdfdf');
      dispatch(setUsers(response.data));
      setLoading(false);
      setError(null);
    } catch (err) {
      console.log('error in loadUsers ==>', err?.response);
      setError('Failed to load users');
      setLoading(false);
    }
  };

  const loadMoreFunction = () => {
    console.log(
      'onReachedMomentRef and loading ==>',
      loading,
      onReachedMomentRef,
    );
    if (!onReachedMomentRef.current && !loading) {
      setPage(prev => prev + 1);
      onReachedMomentRef.current = true;
    }
  };

  const onRefreshFunc = async () => {
    setRefreshing(true);
    dispatch(clearUsers());
    try {
      const response = await getUsersApi(1, limit);
      dispatch(setUsers(response.data));
      setPage(1);
      setError(null);
    } catch (err) {
      console.log('error in response of refressh', err);
      setError('Failed to load users');
    }

    setRefreshing(false);
  };
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderUserLlistItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item?.name}</Text>
      <Text style={styles.email}>{item?.email}</Text>
      <Text style={styles.phone}>{item?.phone}</Text>
      <Text
        style={styles.viewBtn}
        onPress={() => navigation.navigate('UserDetail', { item: item })}
      >
        View Details
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={styles.header}>Users List</Text>
      <TextInput
        placeholder="Search user..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      {error && <Text>{error}</Text>}

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        renderItem={renderUserLlistItem}
        onEndReached={loadMoreFunction}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => {
          onReachedMomentRef.current = false;
        }}
        refreshing={refreshing}
        onRefresh={onRefreshFunc}
        ListFooterComponent={
          loading ? (
            <View style={{ padding: 40 }}>
              <ActivityIndicator size="large" />
            </View>
          ) : !filteredUsers?.length ? (
            <Text>No Item found</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 180,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    marginVertical: 6,
    boxShadow: 'rgba(0,0,0,0.1)',
    // justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    marginBottom: 28,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  email: {
    fontSize: 14,
    color: 'grey',
  },

  phone: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 8,
  },

  viewBtn: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    color: 'green',
    fontWeight: '600',
  },
});
