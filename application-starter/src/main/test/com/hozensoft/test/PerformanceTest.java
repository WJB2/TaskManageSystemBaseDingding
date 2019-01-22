package com.hozensoft.test;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.hozensoft.utils.persistent.IdGen;

public class PerformanceTest {

	public static void main(String[] args) {
		
		List<String> list = new ArrayList<>(100000);
		
		long startTime = System.currentTimeMillis();
		
		for(int i=0; i<1000; i++){
			list.add(IdGen.generate());
		}
		
		long afterInitTime = System.currentTimeMillis();
		
		System.out.println("init cost time: " + (afterInitTime-startTime));
		
		Set<String> set = list.stream().collect(Collectors.toSet());
		
		long transfomedTime = System.currentTimeMillis();
		
		System.out.println("transform into set cost time " + (transfomedTime-afterInitTime));
		
		for(int i=0; i<1000; i++){
			String s = new String(list.get(i));
			
			set.contains(s);
		}
		
		long endTime = System.currentTimeMillis();
		
		System.out.println("compare cost time: " + (endTime-transfomedTime));
	}

}
