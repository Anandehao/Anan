import java.util.Scanner;

/*2.���һ�������ࣺ
         ���ԣ�ѧ���������飬ƽ���֣��ܷ�
         �������ڹ��췽����ʵ��ѧ������Ĵ�������ʼ����
               ����ѧ���ɼ���
               ͳ������ѧ����ƽ���֣��ܷ֡�
               ���༶ͳ��ÿ���ƽ���ֺ��ܷ֡�
*/
public class Manager {
	 Student []stu;
	 double avg;
	 double sum;
	 Manager(int n){
		 stu=new Student[n];
		 Scanner sc=new Scanner(System.in);
		 for(int i=0;i<stu.length;i++) {
			 System.out.println("�������"+(i+1)+"��ѧ����Ϣ��");
			 String num=sc.next();
			 String name=sc.next();
			 String classRoom=sc.next();
			 stu[i]=new Student(num,name,classRoom);
		 }
	 }
	 void add() {
		 Scanner sc=new Scanner(System.in);
		 for(int i=0;i<stu.length;i++) {
			 System.out.println("�������"+(i+1)+"��ѧ���ɼ���");
			 double score=sc.nextDouble();
			 stu[i].set(score);
		 }
	 }
	 void sum_avg() {
		 sum=0;
		 for(int i=0;i<stu.length;i++) {
			 sum=sum+stu[i].score;
		 }
		 avg=sum/stu.length;
		 System.out.println("�ܷ�Ϊ��"+sum+"  ƽ����Ϊ��"+avg);
	 }
	 void sumavg_class(String classRoom) {
		 double sum=0,avg=0; int k=0;
		 for(int i=0;i<stu.length;i++) {
			 if(stu[i].classRoom.equals(classRoom)) {
				 sum=sum+stu[i].score;
				 k++;
			 }
		 }
		 avg=sum/k;
		 System.out.println("�ܷ�Ϊ��"+sum+"  ƽ����Ϊ��"+avg);
	 }
	 
}
