import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
export default function ProfessorList({ navigation }) {

  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserName(user.name || '')

        if (user.email) {
          await checkAdminStatus(user.email);
        }
        }
      } catch (error) {
        console.error('Failed to load user info:', error);
      }
    };

    fetchUserInfo();
    }, []);
  
  const checkAdminStatus = async (email) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/get_user_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("data after response:", data);

      if (data.user && Array.isArray(data.user)) {
        const [id, name, isAdminRaw] = data.user;

        const userInfo = {
          id,
          name,
          email,
          isAdmin: isAdminRaw === 1,
        };

        console.log("after put in userInfo", userInfo);

        setUserName(name);
        setIsAdmin(userInfo.isAdmin); // ✅ update state
        await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      } else {
        console.warn('Invalid user data:', data);
      }
    } catch (error) {
      console.error('Failed to check admin status:', error);
    }
  };
  console.log(isAdmin)
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
    image: 'https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=83zuL4QAAAAJ&citpid=1',
    courses: ['Computer Programming']
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
      {userName ? <Text style={styles.welcome}>Welcome, {userName}!</Text> : null}
    {isAdmin && (
    <TouchableOpacity
    style={styles.adminButton}
    onPress={() => navigation.navigate('AdminDashboard')}
    >
    <Text style={styles.adminButtonText}>Go to Admin Dashboard</Text>
    </TouchableOpacity>
    )}
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
  adminButton: {
  backgroundColor: '#007bff',
  padding: 10,
  borderRadius: 8,
  marginBottom: 20,
  alignItems: 'center',
},
adminButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},
});