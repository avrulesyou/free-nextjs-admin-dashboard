'use client'
import { useState, useEffect } from 'react';
import getClgData from '../api/pgdb.js'
import college from '@/strapicms/src/api/college/controllers/college.js';

interface college {
    name: string;
    city: string;
    state: string;
    country: string;
    courses: string;
    rating: number;
    college_id: string;
    }

const Page = () => {
 const [colleges, setColleges] = useState<college[]>([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [sorted, setSorted] = useState(false);

 

 useEffect(() => {
    const fetchData = async () => {
      const data = await getClgData();
      setColleges(data);
    }
    fetchData();
 }, []);
 const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
     };

     const filteredColleges = colleges.filter((college: college) =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.courses.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div>
           <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch} />
           <button onClick={() => setSorted(!sorted)}>Sort by Rating</button>
           <ul>
             {filteredColleges.sort((a:college, b:college) => (sorted ? a.rating - b.rating : b.rating - a.rating)).map((college:college) => (
               <li key={college.college_id}>
                 {college.name} - {college.city} - {college.state} - {college.country} - {college.courses} - Rating: {college.rating}
               </li>
             ))}
           </ul>
        </div>
       );

 // ... rest of the code
}