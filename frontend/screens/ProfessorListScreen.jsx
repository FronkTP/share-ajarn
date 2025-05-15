import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Dimensions, SafeAreaView, StyleSheet } from 'react-native';

const colors = {
  background: '#fffcf2',
  cardBackground: '#ffffff',
  primary: '#6D2323',
  secondary: '#A31D1D',
  accent: '#E5D0AC',
  textPrimary: '#333333',
  textSecondary: '#555555',
  border: '#e0e0e0',
  shadow: '#000000',
};

export default function ProfessorList({ navigation }) {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  
  useEffect(() => {
    const updateLayout = () => {
      setScreenWidth(Dimensions.get('window').width);
    };
    
    Dimensions.addEventListener('change', updateLayout);
    
    return () => {
      // Cleanup (for older RN versions)
      if (Dimensions.removeEventListener) {
        Dimensions.removeEventListener('change', updateLayout);
      }
    };
  }, []);

  const cardWidth = 200;
  const numColumns = Math.max(1, Math.floor(screenWidth / cardWidth));
  const isMobile = screenWidth < 400;
  
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
      courses: ['Computer Programming', 'Introduction to ICE']
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
      image: 'http://mis.cp.eng.chula.ac.th/view.php?q=instructor/picture&key=10020375',
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
      avgRating: 0,
      image: 'https://www.eng.chula.ac.th/wp-content/uploads/2024/06/05_0-420x600.png',
      courses: ['Application Development']
    },
    {
      id: '15',
      name: 'Ekapol Chuangsuwanich',
      department: 'Computer Engineering',
      avgRating: 0,
      image: 'https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=ST-jPeYAAAAJ&citpid=2',
      courses: ['Artificial Intelligence']
    },
    {
      id: '16',
      name: 'Wasamon Jantai',
      department: 'Mathematics and Computer Science',
      avgRating: 0,
      image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2023/07/Wasamon-640x640-1.jpg',
      courses: ['Calculus I', 'Calculus II']
    },
    {
      id: '17',
      name: 'Wutichai Chongchitmate',
      department: 'Mathematics and Computer Science',
      avgRating: 0,
      image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2019/05/wutichai-5.jpg',
      courses: ['Calculus I']
    },
    {
      id: '18',
      name: 'Tuangrat Chaichana',
      department: 'Mathematics and Computer Science',
      avgRating: 0,
      image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2019/05/tuangrat_640x640-1-5.jpg',
      courses: ['Calculus I', 'Calculus II']
    },
    {
      id: '19',
      name: 'Sujin Khomrutai',
      department: 'Mathematics and Computer Science',
      avgRating: 0,
      image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2019/05/Sujin-Khomrutai-1-5.jpg',
      courses: ['Calculus I']
    },
    {
      id: '20',
      name: 'Pongdate Montagantirud',
      department: 'Mathematics and Computer Science',
      avgRating: 0,
      image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2019/05/Pongdate1.jpg',
      courses: ['Calculus I', 'Calculus II']
    },
    {
      id: '21',
      name: 'Phantipa Thipwiwatpotjana',
      department: 'Mathematics and Computer Science',
      avgRating: 0,
      image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2019/05/Phantipa-Thipwiwatpotjana-1-5.jpg',
      courses: ['Calculus I', 'Calculus II']
    },
    {
      id: '22',
      name: 'Chotiros Surapholchai',
      department: 'Mathematics and Computer Science',
      avgRating: 0,
      image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2019/05/Chotiros-Surapholchai-1-5.jpg',
      courses: ['Calculus II']
    },
    {
      id: '23',
      name: 'Krung Sinapiromsaran',
      department: 'Mathematics and Computer Science',
      avgRating: 0,
      image: 'https://math.sc.chula.ac.th/wordpress/wp-content/uploads/2019/05/Krung-Sinapiromsaran-1-5.jpg',
      courses: ['Calculus II']
    },
    {
      id: '24',
      name: 'Chate Patanothai',
      department: 'Computer Engineering',
      avgRating: 0,
      image: 'https://www.eng.chula.ac.th/wp-content/uploads/2017/01/405-420x600.jpg',
      courses: ['Computer Programming']
    },
    {
      id: '25',
      name: 'Duangdao Wichadakul',
      department: 'Computer Engineering',
      avgRating: 0,
      image: 'https://mis.cp.eng.chula.ac.th/view.php?q=instructor/picture&key=10019318',
      courses: ['Computer Programming']
    }
  ];

  const renderProfessorCard = ({ item }) => {
    // Mobile optimized layout
    if (isMobile) {
      return (
        <TouchableOpacity
          style={styles.mobileCard}
          onPress={() =>
            navigation.navigate('ProfessorDetail', {
              professorId: item.id,
              name: item.name,
              department: item.department,
            })
          }
        >
          <View style={styles.mobileCardContent}>
            <Image 
              source={{ uri: item.image }} 
              style={styles.mobileImage} 
            />
            <View style={styles.mobileInfo}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Text style={styles.department} numberOfLines={1} ellipsizeMode="tail">{item.department}</Text>
              <Text style={styles.rating}>⭐ {item.avgRating === 0 ? "-" : item.avgRating} / 5.0</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    
    // Tablet/desktop layout
    return (
      <TouchableOpacity
        style={[styles.card, { width: cardWidth - 20 }]} // Minus margins
        onPress={() =>
          navigation.navigate('ProfessorDetail', {
            professorId: item.id,
            name: item.name,
            department: item.department,
          })
        }
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.image} 
        />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
          <Text style={styles.department} numberOfLines={1} ellipsizeMode="tail">{item.department}</Text>
          <Text style={styles.rating}>⭐ {item.avgRating === 0 ? "-" : item.avgRating} / 5.0
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, isMobile ? null : { alignItems: 'center' }]}>
      <Text style={styles.title}>Professor List</Text>
      <FlatList
        data={professors}
        keyExtractor={(item) => item.id}
        renderItem={renderProfessorCard}
        numColumns={numColumns}
        key={numColumns}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: 12,
    paddingBottom: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
  },
  // Tablet/desktop card style
  card: {    
    margin: 10,
    padding: 15,
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 125,
    marginBottom: 12,
    alignSelf: 'center',
    borderRadius: 12,
  },
  info: {
    width: '100%',
  },
  // Mobile styles
  mobileCard: {
    marginVertical: 10,
    marginHorizontal: 12,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderColor: colors.border,
    borderWidth: 1,
  },
  mobileCardContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  mobileImage: {
    width: 70,
    height: 90,
    borderRadius: 8,
    marginRight: 20,
  },
  mobileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: colors.textPrimary,
  },
  department: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
});