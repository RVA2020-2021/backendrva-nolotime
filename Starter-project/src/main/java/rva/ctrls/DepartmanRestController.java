package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
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
import rva.jpa.Departman;
import rva.repository.DepartmanRepository;
import rva.repository.FakultetRepository;

@CrossOrigin
@RestController
@Api(tags = { "Departman CRUD operacije" })
public class DepartmanRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private DepartmanRepository departmanRepository;

	// GETTING FROM DATABASE
	@GetMapping("departman")
	@ApiOperation(value = "Vraca kolekciju svih departmana iz baze podataka")
	public Collection<Departman> getDepartmani() {
		return departmanRepository.findAll();
	}

	@GetMapping("departman/{id}")
	@ApiOperation(value = "Vraca tacno jedan departman sa prosledjenom vrednoscu id-a iz baze podataka")
	public Departman getDepartmanByID(@PathVariable("id") Integer id) {
		return departmanRepository.getOne(id);
	}

	@GetMapping("departmanNaziv/{naziv}")
	@ApiOperation(value = "Vraca kolekciju svih departmana koji u svom nazivu sadrze prosledjenu rec/i, iz baze podataka")
	public Collection<Departman> getDepartmanByNaziv(@PathVariable("naziv") String naziv) {
		return departmanRepository.findByNazivContainingIgnoreCase(naziv);
	}

	// INSERTING INTO DATABASE
	@PostMapping("departman")
	@ApiOperation(value = "Unos novog departmana u bazu podataka")
	public ResponseEntity<Departman> insertDepartman(@RequestBody Departman departman) {
		if (!departmanRepository.existsById(departman.getId())) {
			departmanRepository.save(departman);
			return new ResponseEntity<Departman>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Departman>(HttpStatus.CONFLICT);
		}
	}

	// UPDATING DATABASE
	@PutMapping("departman")
	@ApiOperation(value = "Azuriranje postojeceg departmana iz baze podataka")
	public ResponseEntity<Departman> updateDepartman(@RequestBody Departman departman) {
		if (!departmanRepository.existsById(departman.getId())) {
			return new ResponseEntity<Departman>(HttpStatus.NO_CONTENT);
		} else {
			departmanRepository.save(departman);
			return new ResponseEntity<Departman>(HttpStatus.OK);
		}
	}

	// DELETING FROM DATABASE
	@DeleteMapping("departman/{id}")
	@ApiOperation(value = "Brisanje departmana sa prosledjenom vrednoscu id-a iz baze podataka")
	public ResponseEntity<Departman> deleteDepartman(@PathVariable("id") Integer id) {
		if (!departmanRepository.existsById(id)) {
			return new ResponseEntity<Departman>(HttpStatus.NO_CONTENT);
		} else {
			jdbcTemplate.execute("Delete from student where departman=" + id);
			departmanRepository.deleteById(id);
			if (id == -100) {
				jdbcTemplate.execute("INSERT INTO \"departman\" (\"id\",\"naziv\",\"oznaka\",\"fakultet\") Values (-100, 'TestDepartman', 'TEST', 3)");
			}
			return new ResponseEntity<Departman>(HttpStatus.OK);
		}
	}
}
