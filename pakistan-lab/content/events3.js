/* More events (batch 3). Same format as events.js. */
PAK.eventText3 = `
1947-08-11 | law | National flag adopted | The Constituent Assembly adopted the flag: dark green with a white stripe, a white crescent and star. The white stripe stands for minorities. | ?
1947-08-14 | pol | Mountbatten addresses the Constituent Assembly | In Karachi the last Viceroy handed over power and Jinnah replied. | ?
1956-02-29 | law | Constitution adopted by the Assembly | The Constituent Assembly passed the Constitution on 29 February. It came into force on 23 March 1956. | ?
1971-04-17 | pol | Mujibnagar government | Awami League leaders formed a government in exile that took oath in Mujibnagar in East Pakistan. | ?
1971-12-26 | law | Hamoodur Rahman Commission | Bhutto's government set up a commission to look into the causes of the 1971 defeat. Part of its report was made public much later. | ?
1972-01-10 | pol | Mujib returns to Dhaka | Sheikh Mujibur Rahman, released from prison in Pakistan, flew to Dhaka by way of London and Delhi. He became the leader of Bangladesh.
1974-11-10 | pol | Killing of Nawab Muhammad Ahmad Khan Kasuri | The father of the politician Ahmed Raza Kasuri was killed in a firing on a car in Lahore. Bhutto was later charged in this case. | ?
1976-03-01 | mil | Zia becomes Army chief | Bhutto chose Zia-ul-Haq as Chief of Army Staff over several senior generals.
1978-03-18 | law | Bhutto sentenced to death | The Lahore High Court sentenced Bhutto to death in the Kasuri murder case. The Supreme Court rejected his appeal on 6 February 1979.
1980-05-27 | law | Federal Shariat Court set up | The court was established to examine whether laws agree with the injunctions of Islam. | ?
1988-04-10 | dis | Ojhri Camp explosion | An army ammunition depot near Rawalpindi exploded and rockets fell on Rawalpindi and Islamabad, killing about a hundred people. Junejo's inquiry caused tension with Zia. | ?
1992-06-19 | mil | Operation Cleanup in Sindh | The army began an operation against crime and political violence in Sindh, mainly Karachi. | ?
1998-10-09 | law | Fifteenth Amendment bill | The National Assembly passed a bill to make the Quran and Sunnah the supreme law, but the Senate never passed it. | ?
2001-12-13 | for | Attack on the Indian Parliament | After the attack in Delhi, India and Pakistan moved forces to the border and relations were tense for about a year.
2003-12-14 | pol | Attempt on Musharraf | His car was targeted by a bomb in Rawalpindi. Another attempt came on 25 December. | ?
2009-10-10 | mil | Attack on army headquarters | Militants entered the army headquarters (GHQ) in Rawalpindi and held hostages before commandos ended the siege.
2022-11-03 | pol | Imran Khan shot at Wazirabad | Imran Khan was wounded during a PTI long march. He survived. | ?
2022-11-29 | mil | General Asim Munir takes over | He took over from General Bajwa as Chief of Army Staff.
`;
PAK.events = PAK.events.concat(PAK.parseEvents(PAK.eventText3)).sort((a, b) => (a.date + a.title < b.date + b.title ? -1 : 1));
