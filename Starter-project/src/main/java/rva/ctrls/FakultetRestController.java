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
import rva.jpa.Fakultet;
import rva.repository.FakultetRepository;

@CrossOrigin
@RestController
@Api(tags = { "Fakultet CRUD operacije" })
public class FakultetRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private FakultetRepository fakultetRepository;

	// GETTING FROM DATABASE
	@GetMapping("fakultet")
	@ApiOperation(value = "Vraca kolekciju svih fakulteta iz baze podataka")
	public Collection<Fakultet> getFakulteti() {
		return fakultetRepository.findAll();
	}

	@GetMapping("fakultet/{id}")
	@ApiOperation(value = "Vraca tacno jedan fakultet sa prosledjenom vrednoscu id-a iz baze podataka")
	public Fakultet getFakultet(@PathVariable("id") Integer id) {
		return fakultetRepository.getOne(id);
	}

	@GetMapping("fakultetNaziv/{naziv}")
	@ApiOperation(value = "Vraca kolekciju svih fakulteta koji u svom nazivu sadrze prosledjenu rec/i, iz baze podataka")
	public Collection<Fakultet> getFakultetByNaziv(@PathVariable("naziv") String naziv) {
		return fakultetRepository.findByNazivContainingIgnoreCase(naziv);
	}

	// INSERTING INTO DATABASE
	@PostMapping("fakultet")
	@ApiOperation(value = "Unos novog fakulteta u bazu podataka")
	public ResponseEntity<Fakultet> insertFakultet(@RequestBody Fakultet fakultet) {
		if (!fakultetRepository.existsById(fakultet.getId())) {
			fakultetRepository.save(fakultet);
			return new ResponseEntity<Fakultet>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Fakultet>(HttpStatus.CONFLICT);
		}
	}

	// UPDATING DATABASE
	@PutMapping("fakultet")
	@ApiOperation(value = "Azuriranje postojeceg fakulteta iz baze podataka")
	public ResponseEntity<Fakultet> updateFakultet(@RequestBody Fakultet fakultet) {
		if (!fakultetRepository.existsById(fakultet.getId())) {
			return new ResponseEntity<Fakultet>(HttpStatus.NO_CONTENT);
		} else {
			fakultetRepository.save(fakultet);
			return new ResponseEntity<Fakultet>(HttpStatus.OK);
		}
	}

	// DELETING FROM DATABASE
	//@Transactional //problem prilikom brisanja ovog sa -100!
	@DeleteMapping("fakultet/{id}")
	@ApiOperation(value = "Brisanje fakulteta sa prosledjenom vrednoscu id-a iz baze podataka")
	public ResponseEntity<Fakultet> deleteFakultet(@PathVariable("id") Integer id) {
		if (!fakultetRepository.existsById(id)) {
			return new ResponseEntity<Fakultet>(HttpStatus.NO_CONTENT);
		} else {
			jdbcTemplate
					.execute("Delete from student where departman in (select id from departman where fakultet= " + id+")");
			jdbcTemplate.execute("DELETE FROM departman WHERE fakultet=" + id);
			
			fakultetRepository.deleteById(id);
			if (id == -100) {
				jdbcTemplate.execute("INSERT INTO \"fakultet\" (\"id\", \"naziv\", \"sediste\")"
						+ "VALUES(-100, 'TestFakultet', 'TestGrad')");
			}
			return new ResponseEntity<Fakultet>(HttpStatus.OK);
		}
	}
}
