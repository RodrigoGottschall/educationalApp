import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Student {
  picture: { large: string };
  name: { first: string; last: string };
  gender: string;
  dob: { date: string };
  email: string;
  phone: string;
  nat: string;
  location: {
    street: { name: string; number: number };
    city: string;
    state: string;
    postcode: string;
  };
  id: { name: string; value: string };
}

interface StudentContextType {
  students: Student[];
  isLoading: boolean;
  filter: string;
  page: number;
  error: string | null;
  setFilter: (filter: string) => void;
  setPage: (page: number) => void;
  setError: (error: string | null) => void;
}

export const StudentContext = createContext<StudentContextType>({
  students: [],
  isLoading: false,
  filter: "",
  page: 1,
  error: null,
  setFilter: () => {},
  setPage: () => {},
  setError: () => {},
});

interface StudentContextProviderProps {
  children: React.ReactNode;
}

const STUDENTS_PER_PAGE = 20;

export const StudentContextProvider: React.FunctionComponent<
  StudentContextProviderProps
> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);

      try {
        const cachedStudents = await AsyncStorage.getItem("students");
        if (cachedStudents && page === 1) {
          setStudents(JSON.parse(cachedStudents));
        } else {
          const response = await fetch(
            `https://randomuser.me/api/?results=${STUDENTS_PER_PAGE}&page=${page}`
          );
          if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.status}`);
          }
          const data = await response.json();

          if (page === 1) {
            await AsyncStorage.setItem(
              "students",
              JSON.stringify(data.results)
            );
            setStudents(data.results);
          } else {
            setStudents((prevStudents) => [...prevStudents, ...data.results]);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [page, filter]); // Fetch on page or filter change

  return (
    <StudentContext.Provider
      value={{
        students,
        isLoading,
        filter,
        page,
        error,
        setFilter,
        setPage,
        setError,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
