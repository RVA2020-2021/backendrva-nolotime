package rva.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import rva.jpa.Status;
import rva.jpa.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
	Collection<Student> findByBrojIndeksaContainingIgnoreCase(String indeks);
	
	@Query(value = "select * from student where status = 1", nativeQuery = true)
	Collection<Student> budzetskiStudenti();
}
