import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';

export default function ProfessorList({ navigation }) {
  const professors = [
  {
    id: '1',
    name: 'Charnchai Pluempitiwiriyawej',
    department: 'Electrical Engineering',
    avgRating: 0,
    image: 'https://ee.eng.chula.ac.th/wp-content/uploads/2021/01/Charnchai.png',
    courses: ['Probability and Statistics for Data Analysis', 'Advanced Mathematics Methods', 'Signals and Linear Systems'],
  },
  {
    id: '2',
    name: 'David Banjerdpongchai',
    department: 'Electrical Engineering',
    avgRating: 0,
    image: 'https://ee.eng.chula.ac.th/wp-content/uploads/2021/02/72-1024x1536.jpg',
    courses: ['Advanced Mathematics Methods'],
  },
  {
    id: '3',
    name: 'Peerapon Vateekul',
    department: 'Computer Engineering',
    avgRating: 0,
    image: 'https://www.eng.chula.ac.th/wp-content/uploads/2022/05/IMG_1112-420x600.jpg',
    courses: ['Computer Programming', 'Data Science']
  },
  {
    id: '4',
    name: 'Vishnu Kotrajaras',
    department: 'Computer Engineering',
    avgRating: 0,
    image: 'http://mis.cp.eng.chula.ac.th/view.php?q=instructor/picture&key=10002101',
    courses: ['Computer Programming', 'Fundamental Data Structure and Algorithm']
  },
  {
    id: '5',
    name: 'Chonlatep Usaku',
    department: 'Chemical Engineering',
    avgRating: 0,
    image: 'https://chem.eng.chula.ac.th/wp-content/uploads/2024/01/Achonlatep.jpg',
    courses: ['Exploring Engineering World']
  },
  {
    id: '6',
    name: 'Sindhu Achuthankutty',
    department: 'ISE',
    avgRating: 0,
    image: 'http://www.ise.eng.chula.ac.th/images/Lecturer/resize/Dr._Sindhu_375_500.jpg',
    courses: ['Introduction to ICE']
  },
  {
    id: '7',
    name: 'Sirin Nitinawarat',
    department: 'ISE',
    avgRating: 0,
    image: 'http://www.ise.eng.chula.ac.th/images/Lecturer/resize/Sirin_Nitinawarat_Ph.D._375_500.jpg',
    courses: ['Introduction to ICE']
  },
  {
    id: '8',
    name: 'Sukree Sinthupinyo',
    department: 'Computer Engineering',
    avgRating: 0,
    image: 'https://www.eng.chula.ac.th/wp-content/uploads/2017/01/sukree.jpg',
    courses: ['Advanced Computer Programming', 'Application Development']
  },
  {
    id: '9',
    name: 'Yan Zhao',
    department: 'ISE',
    avgRating: 0,
    image: 'http://www.ise.eng.chula.ac.th/images/Lecturer/resize/Assoc._Prof._Yan_Zhao_Ph.D._375_500.jpg',
    courses: ['Electrical Circuit for ICE']
  },
  {
    id: '10',
    name: 'Chanchana Tangwongsan',
    department: 'Electrical Engineering',
    avgRating: 0,
    image: 'https://ee.eng.chula.ac.th/wp-content/uploads/2021/02/Chanchana-1024x1536.jpg',
    courses: ['Fundamental of Circuit and Digital Electronics Laboratory']
  },
  {
    id: '11',
    name: 'Kumbesan Sandrasegaran',
    department: 'ISE',
    avgRating: 0,
    image: 'https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=BWm25YoAAAAJ&citpid=3',
    courses: ['Fundamental of Circuit and Digital Electronics Laboratory', 'Signals and Linear Systems']
  },
  {
    id: '12',
    name: 'Kunwadee Sripanidkulchai',
    department: 'Computer Engineering',
    avgRating: 0,
    image: 'https://lh6.googleusercontent.com/kihoRkmWaxgw3meuiSinj6OdCdMoVFdj4sioT-Z2wiLm6AnfY03qJYBgM82Bm5GJjPZDtDQef68wvO-nnNeOthNJ8xcMu06C0MMi9FlmScX_pvNQ=w1280',
    courses: ['Discrete Structure']
  },
  {
    id: '13',
    name: 'Hossein Miri',
    department: 'ISE',
    avgRating: 0,
    image: 'http://www.ise.eng.chula.ac.th/images/Lecturer/resize/Hossein_Miri_Ph.D__375_500.png',
    courses: ['Fundamental Data Structure and Algorithm', 'Artificial Intelligence']
  },
  {
    id: '14',
    name: 'Machigar Ongtang',
    department: 'Computer Engineering',
    image: 'https://www.eng.chula.ac.th/wp-content/uploads/2024/06/05_0-420x600.png',
    courses: ['Application Development']
  },
  {
    id: '15',
    name: 'Ekapol Chuangsuwanich',
    department: 'Computer Engineering',
    image: 'https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=ST-jPeYAAAAJ&citpid=2',
    courses: ['Artificial Intelligence']
  }
];

const renderItem = ({ item }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() =>
      navigation.navigate('ProfessorDetail', {
        professorId: item.id,
        name: item.name,
        department: item.department,
      })
    }
  >
    <Image source={{ uri: item.image }} />
    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>
      <Text >{item.department}</Text>
      <Text >⭐ {item.avgRating}</Text>
    </View>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <Test/>
      <Text style={styles.title}>Professor List</Text>
      <FlatList
        data={professors}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
});