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
import rva.jpa.Status;
import rva.repository.StatusRepository;

@CrossOrigin
@RestController
@Api(tags = { "Status CRUD operacije" })
public class StatusRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private StatusRepository statusRepository;

	// GETTING FROM DATABASE
	@GetMapping("status")
	@ApiOperation(value = "Vraca kolekciju svih statusa iz baze podataka")
	public Collection<Status> getStatusi() {
		return statusRepository.findAll();
	}

	@GetMapping("status/{id}")
	@ApiOperation(value = "Vraca tacno jedan status sa prosledjenom vrednoscu id-a iz baze podataka")
	public Status getStatusByID(@PathVariable("id") Integer id) {
		return statusRepository.getOne(id);
	}

	@GetMapping("statusNaziv/{naziv}")
	@ApiOperation(value = "Vraca kolekciju svih statusa sa prosledjenom vrednoscu id-a iz baze podataka")
	public Collection<Status> getStatusByNaziv(@PathVariable("naziv") String naziv) {
		return statusRepository.findByNazivContainingIgnoreCase(naziv);
	}

	// INSERTING INTO DATABASE
	@PostMapping("status")
	@ApiOperation(value = "Unos novog statusa u bazu podataka")
	public ResponseEntity<Status> insertStatus(@RequestBody Status status) {
		if (!statusRepository.existsById(status.getId())) {
			statusRepository.save(status);
			return new ResponseEntity<Status>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Status>(HttpStatus.CONFLICT);
		}
	}

	// UPDATING DATABASE
	@PutMapping("status")
	@ApiOperation(value = "Azuriranje postojeceg statusa iz baze podataka")
	public ResponseEntity<Status> updateStatus(@RequestBody Status status) {
		if (!statusRepository.existsById(status.getId())) {
			return new ResponseEntity<Status>(HttpStatus.NO_CONTENT);
		} else {
			statusRepository.save(status);
			return new ResponseEntity<Status>(HttpStatus.OK);
		}
	}

	// DELETE FROM DATABASE
	@DeleteMapping("status/{id}")
	@ApiOperation(value = "Brisanje statusa sa prosledjenom vrednoscu id-a iz baze podataka")
	public ResponseEntity<Status> deleteStatus(@PathVariable("id") Integer id) {
		if (!statusRepository.existsById(id)) {
			return new ResponseEntity<Status>(HttpStatus.NO_CONTENT);
		} else {
			jdbcTemplate.execute("DELETE FROM student WHERE status=" + id);
			statusRepository.deleteById(id);
			if (id == -100) {
				jdbcTemplate.execute(
						"INSERT INTO \"status\" (\"id\",\"naziv\",\"oznaka\")" + "VALUES(-100, 'TestStatus', 'TEST')");
			}
			return new ResponseEntity<Status>(HttpStatus.OK);
		}
	}
}
