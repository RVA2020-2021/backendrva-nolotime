--Fakultet Podaci
insert into "fakultet"
	values(nextval('fakultet_seq'), 'Fakultet Tehnickih Nauka', 'Novi Sad');
insert into "fakultet"
	values(nextval('fakultet_seq'), 'Pravni Fakultet', 'Novi Sad');
insert into "fakultet"
	values(nextval('fakultet_seq'), 'Medicinski Fakultet', 'Novi Sad');
insert into "fakultet"
	values(nextval('fakultet_seq'), 'Akademija Umetnosti', 'Novi Sad');
insert into "fakultet"
	values(nextval('fakultet_seq'), 'Fakultet Organizacionih Nauka', 'Beograd');
	
--Status Podaci
insert into "status"
	values(nextval('status_seq'), 'Budzetski','budzet');
insert into "status"
	values(nextval('status_seq'), 'Samofinansirajuci','samofin');
	
--Departman Podaci
insert into "departman"
	values(nextval('departman_seq'), 'Departman za industrijsko inzenjerstvo i menadzment', 'IIM', 1);
insert into "departman"
	values(nextval('departman_seq') , 'Departman za racunarstvo i automatiku', 'RA', 1);
insert into "departman"
	values(nextval('departman_seq'), 'Departman za arhitekturu i urbanizam', 'AU', 1);
insert into "departman"
	values(nextval('departman_seq'), 'Departman za gradjevinu i geodeziju', 'GG', 1);
	
--Student Podaci
insert into "student"
	values(nextval('student_seq'), 'IT19/2020','Mason', 'Mount',  1, 1);
insert into "student"
	values(nextval('student_seq'), 'IT12/2018','Milan', 'Novcic',  1, 1);
insert into "student"
	values(nextval('student_seq'), 'IT11/2018','Davor', 'Jelic',  1, 1);
insert into "student"
	values(nextval('student_seq'), 'IT2/2018','Stefan', 'Bulaja',  1, 1);
insert into "student"
	values(nextval('student_seq'), 'AH49/2018','Veselko', 'Vasic',  2, 2);
insert into "student"
	values(nextval('student_seq'), 'RA20/2020','Lazar', 'Vranjes',  1, 2);
	
--TEST PODACI
insert into "fakultet"
	values(-100, 'TestFakultet', 'TestGrad');
insert into "status"
	values(-100, 'TestStatus','Test');
insert into "departman"
	values(-100, 'TestDepartman', 'TEST', 3);
insert into "student"
	values(-100, 'TestIme', 'TestPrezime', 'TestIndex', 3, 2);