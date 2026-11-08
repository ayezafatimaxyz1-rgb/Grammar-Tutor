/* People who held the top posts. One per line:
   lane | id | name | post | start | end (blank = still in office) | note on how they came and left | look
   lanes: pm = Prime Minister, hs = Governor-General / President (head of state), army = Army chief.
   look = sketch features: cap (karakul), uniform, glasses, moustache, beard, dupatta, turban, tie, sherwani, tall. */
PAK = window.PAK || {};
PAK.leaderText = `
pm | liaquat | Liaquat Ali Khan | Prime Minister | 1947-08-15 | 1951-10-16 | First Prime Minister. Quaid-e-Azam's right hand. Moved the Objectives Resolution (1949). Shot dead at Company Bagh, Rawalpindi, on 16 October 1951. | glasses sherwani cap
pm | nazimuddin | Khawaja Nazimuddin | Prime Minister | 1951-10-17 | 1953-04-17 | A Bengali leader. Earlier Governor-General (1948 to 1951). Dismissed by Governor-General Ghulam Muhammad although he still had the Assembly's confidence. | sherwani cap
pm | bogra | Muhammad Ali Bogra | Prime Minister | 1953-04-17 | 1955-08-12 | A Bengali diplomat, earlier Ambassador to the USA. Pakistan joined SEATO and signed the US defence agreement in his time. | tie moustache
pm | chmali | Chaudhry Muhammad Ali | Prime Minister | 1955-08-12 | 1956-09-12 | A senior civil servant turned politician. His government brought the first Constitution (1956). | glasses sherwani
pm | suhrawardy | H. S. Suhrawardy | Prime Minister | 1956-09-12 | 1957-10-18 | A Bengali leader of the Awami League. Resigned when President Mirza withdrew support. | glasses tie
pm | chundrigar | I. I. Chundrigar | Prime Minister | 1957-10-18 | 1957-12-16 | Held office for about two months. | cap sherwani
pm | noon | Feroz Khan Noon | Prime Minister | 1957-12-16 | 1958-10-07 | A Punjabi landowner and politician. His government ended with the first martial law of October 1958. The office of Prime Minister was then abolished until 1973. | turban moustache
pm | nurulamin | Nurul Amin | Prime Minister | 1971-12-07 | 1971-12-20 | A Bengali leader appointed Prime Minister by Yahya Khan in the last days of the 1971 war. He served about two weeks. | glasses sherwani
pm | zab | Zulfikar Ali Bhutto | Prime Minister | 1973-08-14 | 1977-07-05 | Founder of the PPP. Earlier President (1971 to 1973). Led the country to the 1973 Constitution. Removed by General Zia in July 1977 and hanged in 1979. | tie moustache
pm | junejo | Muhammad Khan Junejo | Prime Minister | 1985-03-24 | 1988-05-29 | A Sindhi landowner chosen after the 1985 non-party elections. Dismissed by President Zia. | cap moustache
pm | benazir1 | Benazir Bhutto | Prime Minister | 1988-12-02 | 1990-08-06 | The first woman to lead a Muslim country. Her first government was dismissed by President Ghulam Ishaq Khan under Article 58-2(b). | dupatta
pm | nawaz1 | Nawaz Sharif | Prime Minister | 1990-11-06 | 1993-07-18 | Leader of the IJI. Dismissed in April 1993, restored by the Supreme Court in May, and resigned in July with the President. | moustache sherwani
pm | qureshi | Moeenuddin Qureshi | Caretaker Prime Minister | 1993-07-18 | 1993-10-19 | A former World Bank official who led a neutral caretaker government until the October 1993 election. | tie glasses
pm | benazir2 | Benazir Bhutto | Prime Minister | 1993-10-19 | 1996-11-05 | Second term. Dismissed by President Farooq Leghari, a man she herself had chosen as the PPP's candidate. | dupatta
pm | meraj | Malik Meraj Khalid | Caretaker Prime Minister | 1996-11-05 | 1997-02-17 | A veteran PPP politician who led the caretaker government until the February 1997 election. | glasses
pm | nawaz2 | Nawaz Sharif | Prime Minister | 1997-02-17 | 1999-10-12 | Second term, with a large majority. Removed the power to dismiss governments (13th Amendment). Tested the nuclear devices in 1998. Removed by Musharraf's coup. | moustache sherwani
pm | jamali | Zafarullah Khan Jamali | Prime Minister | 2002-11-23 | 2004-06-26 | A Baloch politician, the first Prime Minister after the 2002 election, under President Musharraf. | cap
pm | shujaat | Chaudhry Shujaat Hussain | Prime Minister | 2004-06-30 | 2004-08-26 | Served about two months until Shaukat Aziz could be elected to the Assembly. | moustache sherwani
pm | aziz | Shaukat Aziz | Prime Minister | 2004-08-28 | 2007-11-15 | A former banker, Finance Minister and then Prime Minister. The first PM to complete a full term of the Assembly. | tie glasses
pm | soomro | Muhammad Mian Soomro | Caretaker Prime Minister | 2007-11-16 | 2008-03-24 | Chairman Senate who led the caretaker government for the February 2008 election. | glasses tie
pm | gilani | Yusuf Raza Gilani | Prime Minister | 2008-03-25 | 2012-06-19 | PPP. Disqualified by the Supreme Court in a contempt of court case. Passed the 18th Amendment in his time. | cap sherwani
pm | ashraf | Raja Pervaiz Ashraf | Prime Minister | 2012-06-22 | 2013-03-24 | PPP. Served until the end of the assembly's term. | moustache
pm | khoso | Mir Hazar Khan Khoso | Caretaker Prime Minister | 2013-03-25 | 2013-06-05 | A retired judge who led the caretaker government for the May 2013 election. | cap
pm | nawaz3 | Nawaz Sharif | Prime Minister | 2013-06-05 | 2017-07-28 | Third term. Disqualified by the Supreme Court in the Panama Papers case. | moustache sherwani
pm | abbasi | Shahid Khaqan Abbasi | Prime Minister | 2017-08-01 | 2018-05-31 | PML-N. Served until the assembly's term ended. | glasses
pm | nasirulmulk | Nasirul Mulk | Caretaker Prime Minister | 2018-06-01 | 2018-08-18 | A retired Chief Justice who led the caretaker government for the July 2018 election. | glasses
pm | imran | Imran Khan | Prime Minister | 2018-08-18 | 2022-04-10 | PTI. Former cricket captain who led Pakistan to the 1992 World Cup. The first PM removed by a no-confidence vote. | sherwani
pm | shehbaz1 | Shehbaz Sharif | Prime Minister | 2022-04-11 | 2023-08-14 | Heading a coalition of parties after the no-confidence vote. | tie moustache
pm | kakar | Anwaar-ul-Haq Kakar | Caretaker Prime Minister | 2023-08-14 | 2024-03-04 | A Senator from Balochistan who led the caretaker government for the 2024 election. | glasses
pm | shehbaz2 | Shehbaz Sharif | Prime Minister | 2024-03-04 | | Second term, leading a PML-N and PPP coalition. | tie moustache
hs | jinnah | Muhammad Ali Jinnah | Governor-General | 1947-08-15 | 1948-09-11 | Quaid-e-Azam, the founder. First Governor-General and first President of the Constituent Assembly. Died on 11 September 1948. | cap sherwani glasses
hs | nazimgg | Khawaja Nazimuddin | Governor-General | 1948-09-14 | 1951-10-17 | Succeeded Jinnah. Became Prime Minister in 1951. | sherwani cap
hs | ghulam | Ghulam Muhammad | Governor-General | 1951-10-17 | 1955-10-07 | A former finance minister and civil servant. Dismissed Nazimuddin (1953) and dissolved the Constituent Assembly (1954). | tie moustache
hs | mirza | Iskander Mirza | Governor-General, then President | 1955-10-07 | 1958-10-27 | Last Governor-General. First President under the 1956 Constitution. Declared martial law in 1958 and was removed by Ayub Khan three weeks later. | uniform moustache
hs | ayub | Ayub Khan | President | 1958-10-27 | 1969-03-25 | Army chief who took power in 1958. Introduced Basic Democracies and the 1962 Constitution. Resigned in March 1969. | uniform moustache
hs | yahya | Yahya Khan | President | 1969-03-25 | 1971-12-20 | Army chief who imposed martial law in 1969. Held the 1970 elections. Handed power to Bhutto after the fall of Dhaka. | uniform
hs | zab-p | Zulfikar Ali Bhutto | President | 1971-12-20 | 1973-08-13 | Became President and Chief Martial Law Administrator, then moved to Prime Minister under the new Constitution. | tie moustache
hs | fazal | Fazal Ilahi Chaudhry | President | 1973-08-14 | 1978-09-16 | First President under the 1973 Constitution, a mostly ceremonial office. | cap sherwani
hs | zia | Zia-ul-Haq | President | 1978-09-16 | 1988-08-17 | Army chief who removed Bhutto in 1977. Introduced Islamisation laws and the Eighth Amendment. Died in a plane crash in 1988. | uniform moustache
hs | gik | Ghulam Ishaq Khan | President | 1988-08-17 | 1993-07-18 | A former civil servant and Chairman Senate. Dismissed two governments under Article 58-2(b). Resigned in 1993. | glasses sherwani
hs | leghari | Farooq Leghari | President | 1993-11-14 | 1997-12-02 | PPP. Dismissed Benazir Bhutto's second government in 1996. Resigned in 1997. | moustache sherwani
hs | tarar | Rafiq Tarar | President | 1998-01-01 | 2001-06-20 | A former judge elected during Nawaz Sharif's second term. He stayed in office after the 1999 coup until Musharraf took the post in 2001. | cap sherwani
hs | musharraf | Pervez Musharraf | Chief Executive, then President | 1999-10-12 | 2008-08-18 | Army chief who took over in the 1999 coup. President from 2001. Resigned in 2008 facing impeachment. | uniform
hs | zardari | Asif Ali Zardari | President | 2008-09-09 | 2013-09-09 | PPP, widower of Benazir Bhutto. Completed his five-year term. | moustache sherwani
hs | mamnoon | Mamnoon Hussain | President | 2013-09-09 | 2018-09-09 | PML-N. Completed his term. | glasses cap
hs | alvi | Arif Alvi | President | 2018-09-09 | 2024-03-10 | PTI. A dentist by profession. | glasses
hs | zardari2 | Asif Ali Zardari | President | 2024-03-10 | | Elected to the presidency for a second time. | moustache sherwani
army | messervy | Frank Messervy | Commander-in-Chief | 1947-08-15 | 1948-02-10 | British. First Commander-in-Chief of the Pakistan Army. | uniform moustache
army | gracey | Douglas Gracey | Commander-in-Chief | 1948-02-11 | 1951-01-16 | British. Held office through the first Kashmir war. | uniform moustache
army | ayubc | Ayub Khan | Commander-in-Chief | 1951-01-17 | 1958-10-27 | The first Pakistani Commander-in-Chief. | uniform moustache
army | musa | Muhammad Musa | Commander-in-Chief | 1958-10-27 | 1966-06-18 | Held office during the 1965 war. | uniform moustache
army | yahyac | Yahya Khan | Commander-in-Chief | 1966-06-18 | 1971-12-20 | Later President. | uniform
army | gulhassan | Gul Hassan Khan | Commander-in-Chief | 1971-12-20 | 1972-03-03 | Held office for about three months. | uniform
army | tikka | Tikka Khan | Chief of Army Staff | 1972-03-03 | 1976-03-01 | First to hold the title Chief of Army Staff. | uniform moustache
army | ziac | Zia-ul-Haq | Chief of Army Staff | 1976-03-01 | 1988-08-17 | Later President. | uniform moustache
army | beg | Mirza Aslam Beg | Chief of Army Staff | 1988-08-17 | 1991-08-16 | Took over after Zia's death. | uniform moustache
army | asifnawaz | Asif Nawaz Janjua | Chief of Army Staff | 1991-08-16 | 1993-01-08 | Died in office. | uniform
army | kakarw | Abdul Waheed Kakar | Chief of Army Staff | 1993-01-11 | 1996-01-12 | Helped end the standoff between the President and Prime Minister in 1993. | uniform moustache
army | karamat | Jehangir Karamat | Chief of Army Staff | 1996-01-12 | 1998-10-07 | Resigned after a disagreement with Nawaz Sharif. | uniform glasses
army | musharrafc | Pervez Musharraf | Chief of Army Staff | 1998-10-07 | 2007-11-28 | Later Chief Executive and President. | uniform
army | kayani | Ashfaq Parvez Kayani | Chief of Army Staff | 2007-11-28 | 2013-11-29 | Served six years, including a three-year extension. | uniform
army | raheel | Raheel Sharif | Chief of Army Staff | 2013-11-29 | 2016-11-29 | Led Operation Zarb-e-Azb. | uniform moustache
army | bajwa | Qamar Javed Bajwa | Chief of Army Staff | 2016-11-29 | 2022-11-29 | Served six years, including a three-year extension. | uniform moustache
army | munir | Asim Munir | Chief of Army Staff | 2022-11-29 | | Appointed in November 2022. | uniform
`;
(function () {
  PAK.leaders = PAK.leaderText.trim().split("\n").map((l) => {
    const p = l.split("|").map((x) => x.trim());
    return { lane: p[0], id: p[1], name: p[2], post: p[3], start: p[4], end: p[5], note: p[6], look: (p[7] || "").split(" ").filter(Boolean) };
  });
})();
