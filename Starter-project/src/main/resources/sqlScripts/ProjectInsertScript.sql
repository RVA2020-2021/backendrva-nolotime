--Fakultet Podaci
insert into "fakultet"
	values(1, 'Fakultet Tehnickih Nauka', 'Novi Sad');
insert into "fakultet"
	values(2, 'Pravni Fakultet', 'Novi Sad');
insert into "fakultet"
	values(3, 'Medicinski Fakultet', 'Novi Sad');
insert into "fakultet"
	values(4, 'Akademija Umetnosti', 'Novi Sad');
insert into "fakultet"
	values(5, 'Fakultet Organizacionih Nauka', 'Beograd');
	
--Status Podaci
insert into "status"
	values(1, 'Budzetski','budzet');
insert into "status"
	values(2, 'Samofinansirajuci','samofin');
	
--Departman Podaci
insert into "departman"
	values(1, 'Departman za industrijsko inzenjerstvo i menadzment', 'IIM', 1);
insert into "departman"
	values(2, 'Departman za racunarstvo i automatiku', 'RA', 1);
insert into "departman"
	values(3, 'Departman za arhitekturu i urbanizam', 'AU', 1);
insert into "departman"
	values(4, 'Departman za gradjevinu i geodeziju', 'GG', 1);
	
--Student Podaci
insert into "student"
	values(1, 'Mason', 'Mount', 'IT19/2020', 1, 1);
insert into "student"
	values(2, 'Milan', 'Novcic', 'IT12/2018', 1, 1);
insert into "student"
	values(3, 'Davor', 'Jelic', 'IT11/2018', 1, 1);
insert into "student"
	values(4, 'Stefan', 'Bulaja', 'IT2/2018', 1, 1);
insert into "student"
	values(5, 'Veselko', 'Vasic', 'AH49/2018', 2, 2);
insert into "student"
	values(6, 'Lazar', 'Vranjes', 'RA20/2020', 1, 2);
	
--TEST PODACI
insert into "fakultet"
	values(-100, 'TestFakultet', 'TestGrad');
insert into "status"
	values(-100, 'TestStatus','Test');
insert into "departman"
	values(-100, 'TestDepartman', 'TEST', 3);
insert into "student"
	values(-100, 'TestIme', 'TestPrezime', 'TestIndex', 3, 2);