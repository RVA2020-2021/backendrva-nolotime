package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Student;
import rva.repository.StatusRepository;
import rva.repository.StudentRepository;

@CrossOrigin
@RestController
@Api(tags = {"Student CRUD operacije"})
public class StudentRestController {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private StatusRepository statusRepository;
	
	//GETTING FROM DATABASE
	@GetMapping("student")
	@ApiOperation(value = "Vraca kolekciju svih studenata iz baze podataka")
	public Collection<Student> getStudenti(){
		return studentRepository.findAll();
	}
	
	@GetMapping("student/{id}")
	@ApiOperation(value = "Vraca tacno jednog studenta sa prosledjenom vrednoscu id-a iz baze podataka")
	public Student getStudentById(@PathVariable("id") Integer id) {
		return studentRepository.getOne(id);
	}
	
	@GetMapping("student/budzet")
	@ApiOperation(value = "Vraca kolekciju svih studenata koji su na budzetu, iz baze podataka")
	public Collection<Student> getBudzetskiStudenti(){
		return studentRepository.budzetskiStudenti();
	}
	
	@GetMapping("studentIndeks/{index}")
	@ApiOperation(value = "Vraca kolekciju svih studenata sa prosledjenim indeksom, iz baze podataka")
	public Collection<Student> getStudentiIndeks(@PathVariable("index") String index){		
		return studentRepository.findByBrojIndeksaContainingIgnoreCase(index);
	}
	
	//INSERT INTO DATABASE
	@PostMapping("student")
	@ApiOperation(value = "Unos novog studenta u bazu podataka")
	public ResponseEntity<Student> insertStudent(@RequestBody Student student){
		if(!studentRepository.existsById(student.getId())) {
			studentRepository.save(student);
			return new ResponseEntity<Student>(HttpStatus.OK);
		}else {
			return new ResponseEntity<Student>(HttpStatus.CONFLICT);
		}
	}
	
	//UPDATE DATABASE
	@PutMapping("student")
	@ApiOperation(value = "Azuriranje postojeceg studenta iz baze podataka")
	public ResponseEntity<Student> updateStudent(@RequestBody Student student){
		if(!studentRepository.existsById(student.getId())) {
			return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
		}else {
			studentRepository.save(student);
			return new ResponseEntity<Student>(HttpStatus.OK);
		}
	}
	
	//DELETING FROM DATABASE
	//@Transactional
	@DeleteMapping("student/{id}")
	@ApiOperation(value = "Brisanje studenta sa prosledjenom vrednoscu id-a iz baze podataka")
	public ResponseEntity<Student> deleteStudent(@PathVariable("id") Integer id){
		if (!studentRepository.existsById(id)) {
			return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
		} else {
			studentRepository.deleteById(id);
			if (id == -100) {
				jdbcTemplate.execute(
						"INSERT INTO \"student\" (\"id\", \"ime\", \"prezime\", \"broj_indeksa\", \"departman\", \"status\")"
								+ "VALUES(-100, 'TestIme', 'TestPrezime', 'TestIndex', 3, 2)");
			}
			return new ResponseEntity<Student>(HttpStatus.OK);
		}
	}
}
