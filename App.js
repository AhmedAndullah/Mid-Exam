import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TextInput, Text, Switch, Image, TouchableOpacity } from 'react-native';
import { useBooks } from './useBooks'; // Assuming useBooks is a custom hook that fetches book data

export default function App() {
  const [books, loading] = useBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [isRTL, setIsRTL] = useState(false);

  const handleToggleRTL = () => {
    setIsRTL(!isRTL);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <BookItem
      item={item}
      isRTL={isRTL}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder={isRTL ? "کتاب کا نام سرچ کریں" : "Search by book name"}
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
        <Switch
          style={styles.toggleSwitch}
          value={isRTL}
          onValueChange={handleToggleRTL}
        />
      </View>
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <FlatList
          data={filteredBooks}
          renderItem={renderItem}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        />
      )}
    </View>
  );
}

const BookItem = ({ item, isRTL }) => (
  <TouchableOpacity style={styles.item}>
    <Image source={{ uri: item.coverImageUrl }} style={styles.bookCover} />
    <View style={styles.bookInfo}>
      <Text style={[styles.title, { textAlign: isRTL ? 'right' : 'left' }]}>
        {isRTL ? item.titleUrdu : item.title}
      </Text>
      <Text style={[styles.author, { textAlign: isRTL ? 'right' : 'left' }]}>
        {isRTL ? item.authorUrdu : item.author.name}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#f8f8f8', // Light grey background for the header
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#e9e9e9', // Lighter grey for the search input
    paddingHorizontal: 15,
    borderRadius: 20,
    fontSize: 16,
  },
  toggleSwitch: {
    // Custom styles for the toggle switch
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookCover: {
    width: 70,
    height: 110,
    resizeMode: 'cover',
    borderRadius: 4,
    marginRight: 10,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#646464',
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});
